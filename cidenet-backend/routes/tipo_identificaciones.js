const { Router } = require('express');

const {
    tipoIdentificacionesGet
} = require('../controllers/tipo_identificaciones');

const router = Router();

router.get('/', tipoIdentificacionesGet);

module.exports = router;
