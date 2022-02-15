// Importacion de modulos
const router = require('express').Router()
    const User = require('../models/Users')
const Joi = require('@hapi/joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        'string.empty' : 'La contaseña es necesaria',
        'any.required' : 'La contaseña es necesaria' 
    }),
    user: Joi.string().min(6).max(255).required().messages({
        'string.min' : 'El tamaño minimo para el user es 6',
        'string.max' : 'El tamaño maximo para el user es 255',
        'string.empty' : 'El user es necesario',
        'any.required' : 'El user es necesario' 
    })
})

const schemaLogin = Joi.object({
    user: Joi.string().min(1).max(255).required().messages({
        'string.min' : 'El tamaño minimo para el user o email es 1',
        'string.max' : 'El tamaño maximo para el user o email es 255',
        'string.empty' : 'El user o email es necesario',
        'any.required' : 'El user o email es necesario' 
    }),
    password: Joi.string().min(6).max(1024).required().messages({
        'string.min' : 'El tamaño minimo para la contraseña es 6',
        'string.max' : 'El tamaño maximo para la contraseña es 1024',
        'string.empty' : 'La contaseña es necesaria',
        'any.required' : 'La contaseña es necesaria' 
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

    // Validacion user unico
    var userString = req.body.user
    userString = userString.trim()
    const isUserExist = await User.findOne({ user: userString })
    if (isUserExist) {
        return res.status(400).json({
            error: 'El usuario ya esta en uso.',
            mensaje: 'El usuario ya esta en uso.'
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
        user: userString,
        img: req.body.img || '',

    })

    try {
        const savedUser = await user.save()
        res.status(201).json({
            error: null,
            mensaje: 'Usuario creado correctamente'
        })
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }

})

// Ruta de Login
router.post('/login', async (req, res) => {

    // Validacion de campos
    const { error } = schemaLogin.validate(req.body)
    if (error) {
        res.status(400).json({
            error: error.details[0].message 
        })
    }

    // Comprobamos email y user al permitir el acceso con ambas
    var user = await User.findOne({ email: req.body.user })
    if (!user) {
        user = await User.findOne({ user: req.body.user })
        if (!user) {
            return res.status(400).json({
                error: 'Usuario no creado.'
            })
        }
    }

    // Validacion de contraseña
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) {
        return res.status(401).json({
            error: 'Credenciales incorrectos.'
        })
    }

    // Creacion jwt token
    const token = jwt.sign({
        name: user.email,
        id: user._id
    }, process.env.TOKEN)

    console.log(user);

    return res.header('auth-token', token).json({
        error: null,
        user: {
            user: user.user,
            name: user.name,
            img: user.img,
            email: user.email,
            descripcion: user.descripcion,
            id: user._id,
            token: token
        }
    })
})

module.exports = router;