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


//escuchar peticiones

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto: ${process.env.PORT}`);
})










