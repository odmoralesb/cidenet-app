const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const {
    esPaisValido,
    esTipoIdentificacionValido
} = require('../helpers/db-validators');

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
            'El campo primer apellido debe ser igual o menor a 20 letras'
        ).isLength({ max: 20 }),
        check(
            'primer_apellido',
            'El campo primer apellido debe ser todo en mayusculas sin acentos ni ñ'
        ).matches(/^[A-Z]+$/),
        // Validacion Segundo apellido
        check('segundo_apellido', 'El campo segundo apellido es obligatorio')
            .not()
            .isEmpty(),
        check(
            'segundo_apellido',
            'El campo segundo apellido debe ser igual o menor a 20 letras'
        ).isLength({ max: 20 }),
        check(
            'segundo_apellido',
            'El campo segundo apellido debe ser todo en mayusculas sin acentos ni ñ'
        ).matches(/^[A-Z]+$/),
        // Validacion Primer nombre
        check('primer_nombre', 'El campo primer nombre es obligatorio')
            .not()
            .isEmpty(),
        check(
            'primer_nombre',
            'El campo primer nombre debe ser igual o menor a 20 letras'
        ).isLength({ max: 20 }),
        check(
            'primer_nombre',
            'El campo primer nombre debe ser todo en mayusculas sin acentos ni ñ'
        ).matches(/^[A-Z]+$/),
        // Validacion Otros nombres
        check(
            'otros_nombres',
            'El campo otros nombres debe ser igual o menor a 50 letras'
        ).isLength({ max: 50 }),
        check(
            'otros_nombres',
            'El campo otros nombres debe ser todo en mayusculas sin acentos ni ñ'
        ).matches(/^$|^[A-Z\s]+$/),
        // Validacion pais, tipo de identificacion
        check('pais', 'El campo pais es obligatorio').not().isEmpty(),
        check(
            'tipo_identificacion',
            'El campo tipo_identificacion es obligatorio'
        )
            .not()
            .isEmpty(),
        validarCampos,
        check('pais').custom(esPaisValido),
        check('tipo_identificacion').custom(esTipoIdentificacionValido),
        validarCampos
    ],
    empleadosPost
);

module.exports = router;
