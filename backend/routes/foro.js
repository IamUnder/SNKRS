// Importacion de modulos
const router = require('express').Router()
const authRoutes = require('./validate-token')
const Post = require('../models/post')
const User = require('../models/users')

// Ruta de creacion de post, middleware necesario
router.post('/create', authRoutes, async (req, res) => {

    const user = await User.findById(req.user.id)
    
    const post = new Post({
        idUser: req.user.id,
        body: req.body.post,
        nameUser: user.name,
        user: user.user
    })
    
    try {
        const savedPost = await post.save()
        return res.status(201).json({
            error: null,
            mensaje: 'Post creado correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }

})

// Ruta de obtencion de todos los post (Provisional)
router.get('/get', authRoutes, async (req, res) => {

    const posts = await Post.find().sort({_id: -1})

    return res.json({
        error: null,
        posts: posts
    })
})

// Ruta de obtenicion de los post de un solo usuario
router.get('/get/:id', async (req, res) => {

    const posts = await Post.find({idUser: req.params.id}).sort({_id: -1})

    return res.json({
        error: null,
        posts: posts
    })

}) 

// Ruta para dar follow a un usuario
router.post('/follow', authRoutes, async (req, res) => {

    var loggedUser = await User.findById(req.user.id) // follow
    var user = await User.findById(req.body.id) // Followers

    if (req.user.id == req.body.id){
        return res.status(400).json({
            error: 'No puedes seguirte a ti mismo'
        })
    }

    if (!user.followers.includes(req.user.id) && !loggedUser.follow.includes(req.body.id)) {
        let follow = loggedUser.follow
        let followers = user.followers

        follow.push(req.body.id)
        followers.push(req.user.id)

        await User.findByIdAndUpdate(req.user.id, {
            follow: follow
        }).exec()
        await User.findByIdAndUpdate(req.body.id, {
            followers: followers
        }).exec()

        loggedUser = await User.findById(req.user.id) // follow
        user = await User.findById(req.body.id) // Followers

        return res.json({
            error: null,
            loggedUser: loggedUser,
            user: user
        })

    } else {
        return res.json({
            error: null,
            msg: 'Ya estaba incluido'
        })
    }
})

// Ruta para dar unfollow a un usuario
router.post('/unfollow', authRoutes, async (req, res) => {

    var loggedUser = await User.findById(req.user.id) // follow
    var user = await User.findById(req.body.id) // Followers

    if (req.user.id == req.body.id){
        return res.status(400).json({
            error: 'No puedes darte unfollow a ti mismo'
        })
    }

    if (user.followers.includes(req.user.id) && loggedUser.follow.includes(req.body.id)) {
        let follow = removeItem(loggedUser.follow, req.body.id)
        let followers = removeItem(user.followers, req.user.id)

        await User.findByIdAndUpdate(req.user.id, {
            follow: follow
        }).exec()
        await User.findByIdAndUpdate(req.body.id, {
            followers: followers
        }).exec()

        loggedUser = await User.findById(req.user.id) // follow
        user = await User.findById(req.body.id) // Followers

        return res.json({
            error: null,
            loggedUser: loggedUser,
            user: user
        })

    } else {
        return res.json({
            error: null,
            msg: 'No se seguian'
        })
    }
})

// Funcion para elimiar el valor de un array
function removeItem (array, value) {
    
    var i = array.indexOf( value );
 
    if ( i !== -1 ) {
        array.splice( i, 1 );
    }

    return array
}

module.exports = router