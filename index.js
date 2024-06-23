const path = require('path');
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors');

//crear servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//Directorio Publico
app.use( express.static('public') );

//lectura y parseo del body
app.use( express.json() )

//Rutas
app.use('/api/auth', require('./routes/auth') );

app.use('/api/events', require('./routes/events') );

//Dejar a react-router las rutas que no sean de la api
app.use('*', (req, res) => {
    res.sendFile( path.join( __dirname, 'public/index.html' ) );
})


//escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
})










