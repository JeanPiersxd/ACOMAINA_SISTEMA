const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// POST /api/pedidos - Crear un nuevo pedido
router.post('/pedidos', pedidoController.crearPedido);

// GET /api/pedidos - Obtener todos los pedidos
router.get('/pedidos', pedidoController.getPedidos);

// GET /api/pedidos/fecha/:fecha - Obtener pedidos por fecha
router.get('/pedidos/fecha/:fecha', pedidoController.getPedidosPorFecha);

// PUT /api/pedidos/:id - Actualizar estado del pedido
router.put('/pedidos/:id', pedidoController.actualizarEstadoPedido);

module.exports = router;