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

    const posts = await Post.find()

    return res.json({
        posts: posts
    })
})

module.exports = router