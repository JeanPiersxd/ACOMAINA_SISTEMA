import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

function Navbar() {
const { cartItems } = useCart();
  // Contar total de items en el carrito
const totalItems = cartItems.reduce((sum, item) => sum + item.cantidad, 0);

return (
    <nav className="navbar">
    <div className="navbar-container">
        <Link to="/" className="navbar-logo">
        Acomaina
        </Link>
        
        <ul className="navbar-menu">
        <li className="navbar-item">
            <Link to="/" className="navbar-link">
            Menú
            </Link>
        </li>
        <li className="navbar-item">
            <Link to="/pedido" className="navbar-link">
            Pedido
            {totalItems > 0 && (
                <span className="cart-badge">{totalItems}</span>
            )}
            </Link>
        </li>
        <li className="navbar-item">
            <Link to="/admin" className="navbar-link">
            Administración
            </Link>
        </li>
        </ul>
    </div>
    </nav>
);
}

export default Navbar;