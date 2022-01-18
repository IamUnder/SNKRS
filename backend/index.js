// Declaración de variables
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const config = require('./config/config');

// Declaración de rutas
const indexRouter = require('./routes/index')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// Setteo de la key jwtc
app.set('llave', config.llave);

// Inicializacion del servidor
app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000') 
});

// Ruta de testing
app.use('/', indexRouter );