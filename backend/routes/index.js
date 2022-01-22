// Cargamos el módulo de rutas
const router = require('express').Router()

// Cargamos el controlador
var controller = require('../controllers/login')

// Declaracion de rutas
router.get('/login', controller.login)
router.get('/register', controller.register)

// Exportación de la configuracion
module.exports = router