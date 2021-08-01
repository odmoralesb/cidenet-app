const { Router } = require('express');
const { buscarCorreoGet } = require('../controllers/buscar');

const router = Router();

router.get('/correo/:termino', buscarCorreoGet);

module.exports = router;
