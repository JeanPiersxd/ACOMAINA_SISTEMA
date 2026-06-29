import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // ← Agrega esto
import Navbar from './components/Navbar';
import Menu from './components/Menu';
import Pedido from './components/Pedido';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <CartProvider> {/* ← Envuelve todo con esto */}
      <Router>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/pedido" element={<Pedido />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;