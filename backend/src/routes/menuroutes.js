const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

router.get('/menu', menuController.getMenu);
router.post('/pedidos', menuController.crearPedido);

module.exports = router;