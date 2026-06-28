import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pedido.css';

function Pedido() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    { id: 1, nombre: 'Lechón al Horno', cantidad: 2, precio: 50.00, imagen: 'https://www.machupicchu.biz/imagenes/articulos/plato-lechon-al-horno.jpg' }
  ]);

  const aumentarCantidad = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    ));
  };

  const disminuirCantidad = (id) => {
    setItems(items.map(item => 
      item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item
    ));
  };

  const eliminarItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

  return (
    <>
      <header>
        <div>
          <h1>Acomaina</h1>
          <p>Mesa 4 - Pedido Actual</p>
        </div>
        <a href="/" className="btn-volver">Volver al Menú</a>
      </header>

      <section className="pedido-contenedor">
        <div className="productos">
          <h2>Resumen del Pedido</h2>
          
          {items.map(item => (
            <div className="item" key={item.id}>
              <img src={item.imagen} alt={item.nombre} />
              <div className="detalle">
                <h3>{item.nombre}</h3>
                <p>Cantidad: {item.cantidad}</p>
                <div className="controles">
                  <button onClick={() => disminuirCantidad(item.id)}>-</button>
                  <span>{item.cantidad}</span>
                  <button onClick={() => aumentarCantidad(item.id)}>+</button>
                </div>
                <button className="eliminar" onClick={() => eliminarItem(item.id)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}

          <div className="subtotal">
            <h3>Subtotal: S/ {subtotal.toFixed(2)}</h3>
          </div>
        </div>
      </section>
    </>
  );
}

export default Pedido;