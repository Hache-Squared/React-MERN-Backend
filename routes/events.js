/**
 Rutas de Eventos
 host + /api/events
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

const router = Router();

//Todas las rutas tienen que pasar por la validacion del token
router.use( validarJWT );
//De Aqui para abajo deben de tener el token, si en dado caso requiere ruta publica,
// subir de nivel o encima de la anterior linea una ruta


//obtener eventos
router.get('/', getEventos);

//crear un nuevo evento
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

//Actualizar un evento
router.put('/:id', actualizarEvento);

//Actualizar un evento
router.delete('/:id', eliminarEvento);


module.exports =  router;