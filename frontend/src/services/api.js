const API_URL = 'http://localhost:3001/api';

export const getMenu = async () => {
const response = await fetch(`${API_URL}/menu`);
return response.json();
};

export const crearPedido = async (pedido) => {
const response = await fetch(`${API_URL}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
});
return response.json();
};

export const getMesas = async () => {
const response = await fetch(`${API_URL}/mesas`);
return response.json();
};