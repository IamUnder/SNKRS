// Importacion de modulos
const router = require('express').Router()
const User = require('../models/Users')

router.post('/register', async (req, res) => {

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        user: req.body.user,
        img: req.body.img || '',

    })

    try {
        const savedUser = await user.save()
        res.json({
            error: null,
            mensaje: 'Usuario creado correctamente'
        })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }

})

module.exports = router;