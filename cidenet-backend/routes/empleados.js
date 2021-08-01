const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const {} = require('../helpers/db-validators');

const { empleadosPost } = require('../controllers/empleados');

const router = Router();

router.post(
    '/',
    [
        // Validacion Primer apellido
        check('primer_apellido', 'El primer apellido es obligatorio')
            .not()
            .isEmpty(),
        check(
            'primer_apellido',
            'El primer apellido debe ser igual o menor a 20 letras'
        ).isLength({ max: 20 }),
        check(
            'primer_apellido',
            'El primer apellido debe ser todo en mayusculas sin acentos ni ñ'
        ).matches(/^[A-Z]+$/),
        validarCampos
    ],
    empleadosPost
);

module.exports = router;
