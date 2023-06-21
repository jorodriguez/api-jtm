const router = require('express').Router();
const rutinaController = require('../controllers/rutinaControllerr');
const checkAuth = require('./check-auth');

// Todo lo relacionado al CRUD de rutinas

router.post('/', checkAuth, rutinaController.createRutina);
router.put('/:uuid', checkAuth, rutinaController.edit);
router.get('/:co_sucursal', checkAuth, rutinaController.getRutinasSucursal);
router.delete('/:uuid', checkAuth, rutinaController.remove);


module.exports = router;