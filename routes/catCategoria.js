const router = require('express').Router();
const catCategoriaController = require('../controllers/catCategoriaController');
const checkAuth = require('./check-auth');

// crud para las categorias

router.get('/', checkAuth, catCategoriaController.getCategorias);

module.exports = router;