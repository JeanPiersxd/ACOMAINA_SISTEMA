const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Crear un nuevo pedido
const crearPedido = async (req, res) => {
try {
    const { mesaId, items } = req.body;
    
    const total = items.reduce((sum, item) => {
    return sum + (parseFloat(item.subtotal) || 0);
    }, 0);

    const pedido = await prisma.pedido.create({
    data: {
        mesaId: mesaId ? parseInt(mesaId) : null,
        total: total,
        estado: 'Pendiente',
        detallePedidos: {
        create: items.map(item => ({
            productoId: parseInt(item.productoId),
            cantidad: parseInt(item.cantidad),
            subtotal: parseFloat(item.subtotal),
            observacion: item.observacion || null
        }))
        }
    },
    include: {
        detallePedidos: {
        include: { producto: true }
        },
        mesa: true
    }
    });
    
    res.status(201).json(pedido);
} catch (error) {
    console.error('Error al crear pedido:', error);
    res.status(500).json({ error: 'Error al crear el pedido' });
}
};

// Obtener todos los pedidos
const getPedidos = async (req, res) => {
try {
    const pedidos = await prisma.pedido.findMany({
    include: {
        detallePedidos: {
        include: { producto: true }
        },
        mesa: true
    },
    orderBy: { fecha: 'desc' }
    });
    res.json(pedidos);
} catch (error) {
    console.error('Error al obtener pedidos:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
}
};

// Obtener pedidos por fecha
const getPedidosPorFecha = async (req, res) => {
try {
    const { fecha } = req.params;
    const fechaInicio = new Date(fecha);
    const fechaFin = new Date(fecha);
    fechaFin.setHours(23, 59, 59, 999);

    const pedidos = await prisma.pedido.findMany({
    where: {
        fecha: {
        gte: fechaInicio,
        lte: fechaFin
        }
    },
    include: {
        detallePedidos: {
        include: { producto: true }
        },
        mesa: true
    },
    orderBy: { fecha: 'desc' }
    });
    res.json(pedidos);
} catch (error) {
    console.error('Error al obtener pedidos por fecha:', error);
    res.status(500).json({ error: 'Error al obtener los pedidos' });
}
};

// Actualizar estado del pedido
const actualizarEstadoPedido = async (req, res) => {
try {
    const { id } = req.params;
    const { estado } = req.body;
    
    const pedido = await prisma.pedido.update({
    where: { id: parseInt(id) },
    data: { estado },
    include: {
        detallePedidos: {
        include: { producto: true }
        },
        mesa: true
    }
    });
    
    res.json(pedido);
} catch (error) {
    console.error('Error al actualizar pedido:', error);
    res.status(500).json({ error: 'Error al actualizar el pedido' });
}
};

module.exports = {
crearPedido,
getPedidos,
getPedidosPorFecha,
actualizarEstadoPedido
};