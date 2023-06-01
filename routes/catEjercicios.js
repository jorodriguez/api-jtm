const router = require('express').Router();
const catEjerciciosController = require('../controllers/catEjerciciosController');
const checkAuth = require('./check-auth');

const multer = require('multer');
const fileUpload = multer();

// catalogo de ejercicios

router.post('/', checkAuth, fileUpload.single('image'), catEjerciciosController.create);

module.exports = router;