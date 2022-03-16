// Declaracion de modulos
const router = require('express').Router()
const User = require('../models/users')

// Ruta de testing
router.post('/s', (req, res) => {
    res.json({
        error: null,
        data: 'test'
    })
})

// Ruta de edicion de perfil
router.post('/profile', async (req, res) => {
    var user = await User.findByIdAndUpdate({_id: req.user.id},{
        name: req.body.name, 
        descripcion: req.body.descripcion,
        name: req.body.name      
    })
    
    user = await User.findById(req.user.id)

    return res.json({
        error: null,
        user: {
            user: user.user,
            name: user.name,
            img: user.img,
            email: user.email,
            descripcion: user.descripcion,
            id: user._id,
            follow: user.follow,
            followers: user.followers,
            token: req.header('auth-token')
        }
    })
})

module.exports = router