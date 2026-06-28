const API_URL = 'http://localhost:3001/api';

// Obtener productos del menú
export const getMenu = async () => {
try {
    const response = await fetch(`${API_URL}/menu`);
    if (!response.ok) {
    throw new Error('Error al obtener el menú');
    }
    return await response.json();
} catch (error) {
    console.error('Error en getMenu:', error);
    throw error;
}
};

// Crear un nuevo pedido
export const crearPedido = async (pedido) => {
try {
    const response = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify(pedido),
    });
    if (!response.ok) {
    throw new Error('Error al crear el pedido');
    }
    return await response.json();
} catch (error) {
    console.error('Error en crearPedido:', error);
    throw error;
}
};

// Obtener todos los pedidos
export const getPedidos = async () => {
try {
    const response = await fetch(`${API_URL}/pedidos`);
    if (!response.ok) {
    throw new Error('Error al obtener los pedidos');
    }
    return await response.json();
} catch (error) {
    console.error('Error en getPedidos:', error);
    throw error;
}
};

// Obtener mesas disponibles
export const getMesas = async () => {
try {
    const response = await fetch(`${API_URL}/mesas`);
    if (!response.ok) {
    throw new Error('Error al obtener las mesas');
    }
    return await response.json();
} catch (error) {
    console.error('Error en getMesas:', error);
    throw error;
}
};