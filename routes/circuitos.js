const router = require('express').Router();
const circuito = require('../controllers/circuitosController');
const checkAuth = require('./check-auth');

//router.get('/',((re,res)=>{console.log("")}));

const { guardarCircuitos, getRutinasUser, actualizarRutina, desactivarRutina } = circuito
router.post('/',  guardarCircuitos);
router.get('/rutinas/:id_user?',  getRutinasUser);
router.post('/rutinas/update/:id_rutina?',  actualizarRutina);
router.post('/rutinas/disable/:id_rutina?',  desactivarRutina);
//router.post('/corte/dia/enviar/:id_empresa',checkAuth, corte.getCorteDiaSucursal);


module.exports = router;