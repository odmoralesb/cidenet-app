const { Router } = require('express');

const { areasGet } = require('../controllers/areas');

const router = Router();

router.get('/', areasGet);

module.exports = router;
