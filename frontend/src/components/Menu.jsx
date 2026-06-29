import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const { addToCart } = useCart();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');

  // Mapeo de imágenes por ID de producto
  const imagenesProductos = {
  1: "tacacho.jpg",
  2: "juane_5355-med.webp",
  3: "pachamanca-300x201.webp",
  4: "caldo-mote.webp",
  5: "free-photo-of-botella-de-cerveza-pilsen-calla-o-sobre-hielo-con-fondo-verde.webp",
  6: "free-photo-of-botella-de-cerveza-pilsen-calla-o-sobre-hielo-con-fondo-verde.webp",
  7: "CocaColaOriginal_530x@2x.webp",
  8: "coca-cola-2-lt-cola-284909.webp",
  9: "DS1194_1 Jarra Chicha Morada.webp",
  10: "inca-kola-225.webp",
  11: "D_Q_NP_2X_920399-MCO85714473361_062025-V.webp",
  12: "daa759_097750ef6a634bbaabf70ea0cc29d213m-v2.webp",
  13: "san-luis-agua-mineral-x-750-ml-sin-gas.webp"
};

  // Cargar datos desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resCategorias, resProductos] = await Promise.all([
          fetch('http://localhost:3001/api/categorias'),
          fetch('http://localhost:3001/api/menu')
        ]);
        
        const dataCategorias = await resCategorias.json();
        const dataProductos = await resProductos.json();

        setCategorias(dataCategorias);
        setProductos(dataProductos);
      } catch (error) {
        console.error('Error al cargar el menú:', error);
      }
    };

    fetchData();
  }, []);

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados = categoriaActiva === 'todos'
    ? productos
    : productos.filter(p => p.categoriaId === categoriaActiva);

  return (
    <div className="menu-container">
      {/* HEADER */}
      <header>
        <div>
          <h1>Acomaina</h1>
          <p>Menú del Restaurante</p>
        </div>
        <Link to="/pedido" className="btn-pedido">
          Ver Mi Pedido
        </Link>
      </header>

      {/* FILTROS DE CATEGORÍA */}
      <nav className="categorias-nav">
        <button 
          className={categoriaActiva === 'todos' ? 'activo' : ''}
          onClick={() => setCategoriaActiva('todos')}
        >
          Todos
        </button>
        {categorias.map(cat => (
          <button 
            key={cat.id}
            className={categoriaActiva === cat.id ? 'activo' : ''}
            onClick={() => setCategoriaActiva(cat.id)}
          >
            {cat.nombre}
          </button>
        ))}
      </nav>

      {/* LISTA DE PRODUCTOS */}
      <section className="productos-grid">
        {productosFiltrados.map(producto => (
          <div key={producto.id} className="producto-card">
            <div className="producto-imagen">
              <img 
                src={`http://localhost:3001/imagenes/${producto.imagen}`}
                alt={producto.nombre}
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src="https://via.placeholder.com/150?text=Sin+Imagen"; 
                }}
              />
            </div>
            <div className="producto-info">
              <h3>{producto.nombre}</h3>
              <p className="descripcion">{producto.descripcion}</p>
              <div className="producto-footer">
              <span className="precio">S/ {parseFloat(producto.precio).toFixed(2)}</span>
              <button 
                className="btn-agregar"
                onClick={() => addToCart(producto)}
              >
                Agregar
              </button>
              </div>
              </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Menu;