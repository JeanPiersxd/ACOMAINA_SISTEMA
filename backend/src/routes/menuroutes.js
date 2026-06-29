const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET /api/menu - Obtener todos los productos
router.get('/menu', menuController.getMenu);

// GET /api/categorias - Obtener todas las categorías
router.get('/categorias', menuController.getCategorias);

// GET /api/menu/categoria/:categoriaId - Obtener productos por categoría
router.get('/menu/categoria/:categoriaId', menuController.getProductosPorCategoria);

module.exports = router;