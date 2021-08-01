const { Router } = require('express');

const { paisesGet } = require('../controllers/paises');

const router = Router();

router.get('/', paisesGet);

module.exports = router;
