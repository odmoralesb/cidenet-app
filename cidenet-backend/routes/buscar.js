const { Router } = require('express');
const {
    buscarCorreoGet,
    buscarUsuariosPost
} = require('../controllers/buscar');

const router = Router();

router.get('/correo/:termino', buscarCorreoGet);

router.post('/empleados', buscarUsuariosPost);

module.exports = router;
