const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todos los productos del menú con su categoría
const getMenu = async (req, res) => {
try {
    const productos = await prisma.producto.findMany({
    where: { estado: 1 },
    include: {
        categoria: true
    }
    });
    res.json(productos);
} catch (error) {
    console.error('Error al obtener menú:', error);
    res.status(500).json({ error: 'Error al obtener el menú' });
}
};

// Obtener productos por categoría
const getProductosPorCategoria = async (req, res) => {
try {
    const { categoriaId } = req.params;
    const productos = await prisma.producto.findMany({
    where: { 
        categoriaId: parseInt(categoriaId),
        estado: 1
    },
    include: {
        categoria: true
    }
    });
    res.json(productos);
} catch (error) {
    console.error('Error al obtener productos por categoría:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
}
};

// Obtener todas las categorías
const getCategorias = async (req, res) => {
try {
    const categorias = await prisma.categoria.findMany();
    res.json(categorias);
} catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ error: 'Error al obtener las categorías' });
}
};

// Exportar todas las funciones
module.exports = {
getMenu,
getProductosPorCategoria,
getCategorias
};