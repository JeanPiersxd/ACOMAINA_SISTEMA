const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getMenu = async (req, res) => {
    try {
    const productos = await prisma.producto.findMany();
    res.json(productos);
} catch (error) {
    res.status(500).json({ error: 'Error al obtener el menú' });
}
};

exports.crearPedido = async (req, res) => {
try {
    const { mesaId, items } = req.body;
    const pedido = await prisma.pedido.create({
    data: {
        mesaId,
        items: {
        create: items.map(item => ({
            productoId: item.productoId,
            cantidad: item.cantidad,
            precio: item.precio
        }))
        }
    }
    });
    res.json(pedido);
} catch (error) {
    res.status(500).json({ error: 'Error al crear pedido' });
}
};