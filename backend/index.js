// Declaracion de paquetes.
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

// Inicializacion de express
const app = express()

// Capturar body
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

// Conexion DB
//const url = `mongodb://${process.env.USERDB}:${process.env.PASSWORDDB}@${process.env.URL}/${process.env.DBNAME}?retryWrites=true&w=majority`
const url = `mongodb://${process.env.URL}/${process.env.DBNAME}?retryWrites=true&w=majority`
mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then( () => console.log('Base de datos contectada') )
.catch( e => console.log('Error en la conexion: ', e) )

// Importacion de rutas
const authRoutes = require('./routes/auth')
const validateToken = require('./routes/validate-token')

const optionsRoutes = require('./routes/optionsUser')

// Middlewares
app.get('/', (req, res) => {
    res.json({
        error: false,
        mensaje: 'Works!'
    })
})

app.use('/api/', authRoutes)
app.use('/api/u/', validateToken, optionsRoutes)

// Iniciar server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})