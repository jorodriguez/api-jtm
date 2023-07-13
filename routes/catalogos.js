const router = require('express').Router();
const catalogos = require('../controllers/catalogos');
const checkAuth = require('./check-auth');

router.get('/unidad_repeticion', checkAuth, catalogos.getCatUnidadRepeticion);

module.exports = router;