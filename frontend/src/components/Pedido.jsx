import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import './Pedido.css';

function Pedido() {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const [mesaSeleccionada, setMesaSeleccionada] = useState('');
  const [mesas, setMesas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const navigate = useNavigate();

  // Cargar las mesas disponibles
  // Al inicio del componente, después de los useState
useEffect(() => {
  const cargarMesas = async () => {
    try {
      console.log('Cargando mesas...');
      const response = await fetch('http://localhost:3001/api/mesas');
      
      if (!response.ok) {
        throw new Error('Error al cargar las mesas');
      }
      
      const data = await response.json();
      console.log('Mesas cargadas:', data);
      setMesas(data);
    } catch (error) {
      console.error('Error al cargar mesas:', error);
      setMensaje({ 
        tipo: 'error', 
        texto: 'No se pudieron cargar las mesas. Verifica que el backend esté corriendo.' 
      });
    }
  };
  
  cargarMesas();
}, []);

  // Calcular el total del pedido
  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

  // Función para confirmar el pedido
  const confirmarPedido = async () => {
    if (cartItems.length === 0) {
      setMensaje({ tipo: 'error', texto: 'El carrito está vacío' });
      return;
    }

    setCargando(true);
    setMensaje({ tipo: '', texto: '' });

    try {
      // Preparar los datos del pedido
      const pedidoData = {
        mesaId: mesaSeleccionada ? parseInt(mesaSeleccionada) : null,
        items: cartItems.map(item => ({
          productoId: item.id,
          cantidad: item.cantidad,
          subtotal: parseFloat(item.subtotal),
          observacion: null
        }))
      };

      // Enviar al backend
      const response = await fetch('http://localhost:3001/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pedidoData)
      });

      if (!response.ok) {
        throw new Error('Error al crear el pedido');
      }

      const pedidoCreado = await response.json();

      // Éxito
      setMensaje({ 
        tipo: 'exito', 
        texto: `¡Pedido confirmado! Número de pedido: #${pedidoCreado.id}` 
      });

      // Limpiar el carrito
      clearCart();
      setMesaSeleccionada('');

      // Después de 2 segundos, redirigir al menú
      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (error) {
      console.error('Error al confirmar pedido:', error);
      setMensaje({ 
        tipo: 'error', 
        texto: 'Error al confirmar el pedido. Intenta de nuevo.' 
      });
    } finally {
      setCargando(false);
    }
  };

  // Si el carrito está vacío
  if (cartItems.length === 0) {
    return (
      <div className="pedido-container">
        <div className="pedido-vacio">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos desde el menú para hacer un pedido</p>
          <Link to="/" className="btn-volver-menu">
            Ir al Menú
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pedido-container">
      <h2>Tu Pedido</h2>
      
      {/* Mensaje de confirmación o error */}
      {mensaje.texto && (
        <div className={`mensaje ${mensaje.tipo}`}>
          {mensaje.texto}
        </div>
      )}
      
      <div className="pedido-content">
        {/* Lista de productos */}
        <div className="pedido-items">
          {cartItems.map(item => (
            <div key={item.id} className="pedido-item">
              <div className="item-info">
                <h3>{item.nombre}</h3>
                <p className="item-precio">S/ {parseFloat(item.precio).toFixed(2)} c/u</p>
              </div>
              
              <div className="item-controls">
                {/* Controles de cantidad */}
                <div className="cantidad-controls">
                  <button 
                    className="btn-cantidad"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="cantidad">{item.cantidad}</span>
                  <button 
                    className="btn-cantidad"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                
                {/* Subtotal */}
                <div className="item-subtotal">
                  S/ {parseFloat(item.subtotal).toFixed(2)}
                </div>
                
                {/* Botón eliminar */}
                <button 
                  className="btn-eliminar"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div className="pedido-resumen">
          <h3>Resumen</h3>
          
          {/* Selector de mesa */}
          <div className="selector-mesa">
            <label htmlFor="mesa">Mesa (opcional):</label>
            <select 
              id="mesa"
              value={mesaSeleccionada}
              onChange={(e) => setMesaSeleccionada(e.target.value)}
            >
              <option value="">Sin mesa específica</option>
              {mesas.map(mesa => (
                <option key={mesa.id} value={mesa.id}>
                  Mesa {mesa.numero} - {mesa.estado}
                </option>
              ))}
            </select>
          </div>
          
          <div className="resumen-linea">
            <span>Subtotal:</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
          <div className="resumen-linea total">
            <span>Total:</span>
            <span>S/ {total.toFixed(2)}</span>
          </div>
          
          <button 
            className="btn-confirmar"
            onClick={confirmarPedido}
            disabled={cargando}
          >
            {cargando ? 'Confirmando...' : 'Confirmar Pedido'}
          </button>
          
          <button 
            className="btn-limpiar"
            onClick={() => {
              if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
                clearCart();
              }
            }}
          >
            Vaciar Carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pedido;