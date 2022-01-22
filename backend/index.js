// Declaración de variables
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const { config } = require('dotenv')

// Declaración de rutas
const indexRouter = require('./routes/index')

const app = express()
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// 
app.set('key', config().parsed.KEY);
app.set('config', config().parsed)
app.locals.env = app.get('key')
app.locals.config = app.get('config')

// Inicializacion del servidor
app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000') 
});

// Ruta de testing
app.use('/', indexRouter );