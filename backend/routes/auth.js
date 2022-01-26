// Importacion de modulos
const router = require('express').Router()
const User = require('../models/Users')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')

// Validacion 
const schemaRegister = Joi.object({
    name: Joi.string().min(1).max(255).required().messages({
        'string.min' : 'El tamaño minimo para el nombre es 1',
        'string.max' : 'El tamaño maximo para el nombre es 255',
        'string.empty' : 'El nombre es necesario',
        'any.required' : 'El nombre es necesario' 
    }),
    email: Joi.string().min(6).max(255).required().email().messages({
        'string.min' : 'El tamaño minimo para el email es 6',
        'string.max' : 'El tamaño maximo para el email es 255',
        'string.empty' : 'El email es necesario',
        'any.required' : 'El email es necesario',
        'string.email' : 'El email no es valido'
    }),
    password: Joi.string().min(6).max(1024).required().messages({
        'string.min' : 'El tamaño minimo para la contraseña es 6',
        'string.max' : 'El tamaño maximo para la contraseña es 1024',
        'string.empty' : 'La contaseña es necesario',
        'any.required' : 'La contaseña es necesario' 
    }),
    user: Joi.string().min(6).max(255).required().messages({
        'string.min' : 'El tamaño minimo para el user es 6',
        'string.max' : 'El tamaño maximo para el user es 255',
        'string.empty' : 'El user es necesario',
        'any.required' : 'El user es necesario' 
    })
})

// Ruta de registro
router.post('/register', async (req, res) => {

    // Validacion de campos
    const { error } = schemaRegister.validate(req.body)

    if (error) {
        return res.status(400).json({
            error: error.details[0].message
        })
    }

    // Validacion email unico
    const isEmailExist = await User.findOne({ email: req.body.email })
    if (isEmailExist) {
        return res.status(400).json({
            error: 'Email ya registrado.',
            mensaje: 'Email ya registrado.'
        })
    }

    // Hash contraseña
    const salt = await bcrypt.genSalt(10)
    const password = await bcrypt.hash(req.body.password, salt)

    // Creacion del usuario
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password,
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