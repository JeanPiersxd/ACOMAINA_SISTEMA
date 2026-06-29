import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
const [cartItems, setCartItems] = useState([]);

  // Agregar producto al carrito
const addToCart = (producto) => {
    setCartItems(prevItems => {
      // Si ya existe, aumentar cantidad
    const existingItem = prevItems.find(item => item.id === producto.id);
    if (existingItem) {
        return prevItems.map(item =>
        item.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * parseFloat(item.precio) }
            : item
        );
    }
      // Si no existe, agregarlo
    return [...prevItems, { 
        ...producto, 
        cantidad: 1, 
        subtotal: parseFloat(producto.precio) 
    }];
    });
};

  // Aumentar cantidad
const increaseQuantity = (id) => {
    setCartItems(prevItems => prevItems.map(item => 
    item.id === id 
        ? { ...item, cantidad: item.cantidad + 1, subtotal: (item.cantidad + 1) * parseFloat(item.precio) }
        : item
    ));
};

  // Disminuir cantidad
const decreaseQuantity = (id) => {
    setCartItems(prevItems => prevItems.map(item => 
    item.id === id && item.cantidad > 1
        ? { ...item, cantidad: item.cantidad - 1, subtotal: (item.cantidad - 1) * parseFloat(item.precio) }
        : item
    ).filter(item => item.cantidad > 0));
};

  // Eliminar producto
const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
};

  // Limpiar carrito (después de hacer el pedido)
const clearCart = () => {
    setCartItems([]);
};

return (
    <CartContext.Provider value={{ cartItems, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }}>
    {children}
    </CartContext.Provider>
);
}

export function useCart() {
return useContext(CartContext);
}