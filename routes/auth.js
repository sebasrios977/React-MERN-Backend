/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');

router.post(
    '/', 
    [   // Middlewares
        check('email', 'Email obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos,
    ], 
    loginUsuario
);
router.post(
    '/new', 
    [   // Middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Email obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos,
    ], 
    crearUsuario
);
router.get(
    '/renew',
    validarJWT,
    revalidarToken
);


module.exports = router;