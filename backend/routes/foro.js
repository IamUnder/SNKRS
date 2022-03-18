// Importacion de modulos
const router = require('express').Router()
const authRoutes = require('./validate-token')
const Post = require('../models/post')
const User = require('../models/users')
const multer  = require('multer')
const upload = multer()
const firebase = require('../config/firebase')
const { v4 } = require('uuid');

// Ruta de creacion de post, middleware necesario
router.post('/create', authRoutes, upload.any('files'), async (req, res) => {

    var files = []

    if (req.files.length != 0) {
        req.files.forEach(element => { // Por cada archivo subimos el fichero
            
            let token = v4();
            // Grab the file
            let file = element;
            // Format the filename
            let timestamp = Date.now();
            let name = file.originalname.split(".")[0];
            let type = file.originalname.split(".")[1];
            let fileName = `${name}_${timestamp}.${type}`;
            let blob = firebase.bucket.file(fileName)
            
            let blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: element.mimetype,
                    metadata: {
                        firebaseStorageDownloadTokens: token,
                    }
                }
            })

            blobWriter.end(element.buffer)
            
            let url = 'https://firebasestorage.googleapis.com/v0/b/snkrs-c87de.appspot.com/o/' + fileName + "?alt=media&token=" + token

            files.push(url)
        });
    } 

    const user = await User.findById(req.user.id)
    
    const post = new Post({
        idUser: req.user.id,
        body: req.body.post,
        nameUser: user.name,
        user: user.user,
        imgUser: user.img,
        files: files
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

// Ruta de creacion de respuesta a post
router.post('/reply', authRoutes, upload.any('files'), async (req, res) => {

    var files = []

    if (req.files.length != 0) {
        req.files.forEach(element => { // Por cada archivo subimos el fichero
            
            let token = v4();
            // Grab the file
            let file = element;
            // Format the filename
            let timestamp = Date.now();
            let name = file.originalname.split(".")[0];
            let type = file.originalname.split(".")[1];
            let fileName = `${name}_${timestamp}.${type}`;
            let blob = firebase.bucket.file(fileName)
            
            let blobWriter = blob.createWriteStream({
                metadata: {
                    contentType: element.mimetype,
                    metadata: {
                        firebaseStorageDownloadTokens: token,
                    }
                }
            })

            blobWriter.end(element.buffer)
            
            let url = 'https://firebasestorage.googleapis.com/v0/b/snkrs-c87de.appspot.com/o/' + fileName + "?alt=media&token=" + token

            files.push(url)
        });
    } 

    const user = await User.findById(req.user.id)
    const parent = await Post.findById(req.body.parentId)
    console.log(user.img);
    var reply = parent.reply
    
    const post = new Post({
        idUser: req.user.id,
        body: req.body.post,
        nameUser: user.name,
        user: user.user,
        imgUser: user.img,
        parent: req.body.parentId,
        files: files
    })

    reply.push(post._id)
    
    try {
        const savedPost = await post.save()
        const updatedPost = await Post.findByIdAndUpdate(req.body.parentId, {reply: reply})
        return res.status(201).json({
            error: null,
            mensaje: 'Respuesta creada correctamente'
        })
    } catch (error) {
        return res.status(400).json({
            error: error
        })
    }

})

// Ruta de obtencion de todos los post de los usuarios a los que se sigue
router.get('/get', authRoutes, async (req, res) => {

    var user = await User.findById(req.user.id)
    var follow = user.follow
    follow.push(req.user.id)

    const posts = await Post.find({idUser: { $in: follow }}).sort({_id: -1}).limit(50)

    return res.json({
        error: null,
        posts: posts
    })
})

// Ruta de obtencion de todos los post
router.get('/getall', authRoutes, async (req, res) => {


    const posts = await Post.find().sort({_id: -1}).limit(50)

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

    console.log(req.user);

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
            error: true,
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
            error: true,
            msg: 'No se seguian'
        })
    }
})

// Ruta para obtener un post en concreto con su cadena
router.post('/getPost/:id', async (req, res) => {

    var post = await Post.findById(req.params.id)
    var parent = []
    var reply = []

    if (!post.parent == '') {
        parent = await Post.findById(post.parent)
    }

    if (post.reply.length != 0) {
        reply = await Post.find({_id: { $in: post.reply }}).sort({_id: 1})
    }


    return res.json({
        error: null,
        post: post,
        parent: parent,
        reply: reply,
    })

})

// Ruta para dar fav a un mensaje
router.post('/fav', authRoutes, async (req, res) => {

    var post = await Post.findById(req.body.id)
    var fav = post.fav

    // Comprobamos que el array de fav contiene o no la id del usuario
    if (fav.includes(req.user.id)) { // Si lo incluye lo borramos
        fav = removeItem(fav, req.user.id)
    } else { // Si no esta, lo incluimos
        fav.push(req.user.id)
    }

    try {
        await Post.findByIdAndUpdate(req.body.id, {
            fav: fav
        })

        return res.json({
            error:  null,
            msg: 'Operación correcta'
        })
    } catch (error) {
        return res.json({
            error:  true,
            msg: error
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