import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menu from "./components/Menu";
import Pedido from "./components/Pedido";
import Admin from "./components/Admin";

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: Muestra el Menú Digital */}
        <Route path="/" element={<Menu />} />
        
        {/* Ruta del carrito: Muestra la pantalla de Pedidos */}
        <Route path="/pedido" element={<Pedido />} />
        
        {/* Ruta del panel: Muestra la pantalla del Administrador */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;