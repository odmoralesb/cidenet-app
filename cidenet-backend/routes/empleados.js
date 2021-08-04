const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const {
    esPaisValido,
    esTipoIdentificacionValido,
    existeCorreo,
    existeIdentificacion,
    existeEmpleadoPorID
} = require('../helpers/db-validators');

const {
    empleadosPost,
    empleadosGet,
    empleadoGet,
    empleadosDelete,
    empleadoPut
} = require('../controllers/empleados');

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
        ).matches(/^[A-Z\s]+$/),
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
        ).matches(/^[A-Z\s]+$/),
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
        // Validacion de identificacion
        check('identificacion', 'El campo identificacion es obligatorio')
            .not()
            .isEmpty(),
        check(
            'identificacion',
            'El campo identificacion debe ser igual o menor a 20 letras'
        ).isLength({ max: 20 }),
        validarCampos,
        check(
            'identificacion',
            'El campo identificacion solo permite caracteres alfanumerico y el caracter "-"'
        ).matches(/^[A-Za-z0-9\-]+$/),
        check('identificacion').custom(existeIdentificacion),
        // Validacion de correo
        check('correo', 'El correo es obligatorio').not().isEmpty(),
        validarCampos,
        check('correo', 'El correo no es válido').isEmail(),
        check(
            'correo',
            'El campo correo debe ser igual o menor a 20 letras'
        ).isLength({ max: 300 }),
        check('correo').custom(existeCorreo),
        validarCampos,
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

router.get('/', empleadosGet);

router.get(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeEmpleadoPorID),
        validarCampos
    ],
    empleadoGet
);

router.put(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeEmpleadoPorID),
        validarCampos
    ],
    empleadoPut
);

router.delete(
    '/:id',
    [check('id', 'No es un ID válido').isMongoId(), validarCampos],
    empleadosDelete
);

module.exports = router;
