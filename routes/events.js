
const { validarJWT } = require("../middlewares/validar-jwt");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { Router } = require('express');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const router = Router();

router.use(validarJWT);

router.get(
    '/',
    getEventos,
);

router.post(
    '/',
    [
        check('title', 'Titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha final es obligatoria').custom(isDate),
        validarCampos,
    ],
    crearEvento,
);

router.put(
    '/:id',
    [
        check('title', 'Titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom(isDate),
        check('end', 'Fecha final es obligatoria').custom(isDate),
        validarCampos,
    ],
    actualizarEvento
);

router.delete(
    '/:id',
    eliminarEvento
);

module.exports = router;