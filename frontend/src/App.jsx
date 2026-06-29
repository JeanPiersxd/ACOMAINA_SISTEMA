import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Pedido from './components/Pedido';
import Admin from './components/Admin';
import './App.css';

// Este componente mantiene tu Navbar pero solo donde tú quieres
function LayoutConNavbar({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Routes>
            {/* Rutas con Navbar (Cliente) */}
            <Route path="/menu" element={<LayoutConNavbar><Menu /></LayoutConNavbar>} />
            <Route path="/pedido" element={<LayoutConNavbar><Pedido /></LayoutConNavbar>} />
            
            {/* Ruta sin Navbar (Admin) */}
            {/* Aquí no llamamos a LayoutConNavbar, así que el Admin se verá 
                exactamente como lo diseñaste, sin Navbar encima */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;