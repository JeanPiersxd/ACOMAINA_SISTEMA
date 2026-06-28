import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Menu from './components/Menu';
import Pedido from './components/Pedido';
import Admin from './components/Admin';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* Navegación simple (puedes ocultarla después) */}
        <nav style={{ padding: '10px', background: '#333', marginBottom: '20px' }}>
          <Link to="/" style={{ color: 'white', marginRight: '20px' }}>Menú</Link>
          <Link to="/pedido" style={{ color: 'white', marginRight: '20px' }}>Pedido</Link>
          <Link to="/admin" style={{ color: 'white' }}>Administración</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/pedido" element={<Pedido />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;