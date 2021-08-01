const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares');

const {
    esRoleValido,
    emailExiste,
    existeUsuarioPorID
} = require('../helpers/db-validators');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet);

router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check(
            'password',
            'El password debe ser  igual o mayor a 6 letras'
        ).isLength({ min: 6 }),
        check('correo', 'El correo no es válido').isEmail().not().isEmpty(),
        check('correo').custom(emailExiste),
        validarCampos
    ],
    usuariosPost
);

router.put(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorID),
        validarCampos
    ],
    usuariosPut
);

router.delete(
    '/:id',
    [
        check('id', 'No es un ID válido').isMongoId(),
        check('id').custom(existeUsuarioPorID),
        validarCampos
    ],
    usuariosDelete
);

module.exports = router;
