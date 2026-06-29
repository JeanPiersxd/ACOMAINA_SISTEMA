const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Obtener todas las mesas
const getMesas = async (req, res) => {
try {
    const mesas = await prisma.mesa.findMany({
    include: {
        pedidos: {
        where: { estado: 'Pendiente' }
        }
    }
    });
    res.json(mesas);
} catch (error) {
    console.error('Error al obtener mesas:', error);
    res.status(500).json({ error: 'Error al obtener las mesas' });
}
};

// Obtener una mesa por ID
const getMesaById = async (req, res) => {
try {
    const { id } = req.params;
    const mesa = await prisma.mesa.findUnique({
    where: { id: parseInt(id) },
    include: {
        pedidos: {
        where: { estado: 'Pendiente' },
        include: {
            detallePedidos: {
            include: { producto: true }
            }
        }
        }
    }
    });
    if (!mesa) {
    return res.status(404).json({ error: 'Mesa no encontrada' });
    }
    res.json(mesa);
} catch (error) {
    console.error('Error al obtener mesa:', error);
    res.status(500).json({ error: 'Error al obtener la mesa' });
}
};

// Actualizar estado de la mesa
const actualizarEstadoMesa = async (req, res) => {
try {
    const { id } = req.params;
    const { estado } = req.body;
    
    const mesa = await prisma.mesa.update({
    where: { id: parseInt(id) },
    data: { estado }
    });
    
    res.json(mesa);
} catch (error) {
    console.error('Error al actualizar mesa:', error);
    res.status(500).json({ error: 'Error al actualizar la mesa' });
}
};

module.exports = {
getMesas,
getMesaById,
actualizarEstadoMesa
};