// Declaracion de modulos
const jwt = require('jsonwebtoken')

// Middleware para validar rutas
const verifyToken = (req, res, next) => {
    const token = req.header('auth-token')
    if (!token) return res.status(401).json({ error: 'Acceso denegado.' })

    try {
        const verified = jwt.verify(token, process.env.TOKEN)
        req.user = verified
        next()
    } catch (error) {
        res.status(400).json({ error: 'El token no es valido.' })
    }
}

module.exports = verifyToken;