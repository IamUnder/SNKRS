// Cargamos el módulo de rutas
const router = require('express').Router()

// Cargamos el controlador
var controller = require('../controllers/login')

// Declaracion de rutas
router.get('/', controller.test)

// Exportación de la configuracion
module.exports = router