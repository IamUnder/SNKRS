// Declaracion de modulos
const router = require('express').Router()

// Ruta de edicion de perfil
router.get('/', (req, res) => {
    res.json({
        error: null,
        data: 'test'
    })
})

module.exports = router