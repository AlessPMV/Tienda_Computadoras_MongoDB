const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/', ventasController.getAllVentas);
router.get('/:id', ventasController.getVentaById);
router.post('/', ventasController.createVenta);

module.exports = router;
