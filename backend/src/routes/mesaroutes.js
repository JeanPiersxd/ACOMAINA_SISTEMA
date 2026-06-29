const express = require('express');
const router = express.Router();
const mesaController = require('../controllers/mesaController');

// GET /api/mesas - Obtener todas las mesas
router.get('/mesas', mesaController.getMesas);

// GET /api/mesas/:id - Obtener una mesa por ID
router.get('/mesas/:id', mesaController.getMesaById);

// PUT /api/mesas/:id - Actualizar estado de la mesa
router.put('/mesas/:id', mesaController.actualizarEstadoMesa);

module.exports = router;