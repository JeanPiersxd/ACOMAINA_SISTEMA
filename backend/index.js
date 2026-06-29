const express = require('express');
const cors = require('cors');
const path = require('path'); 
require('dotenv').config();
const menuRoutes = require('./src/routes/menuRoutes');
const pedidoRoutes = require('./src/routes/pedidoRoutes');
const mesaRoutes = require('./src/routes/mesaRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/imagenes', express.static(path.join(__dirname, 'public/imagenes'))); 

// Routes
app.use('/api', menuRoutes);
app.use('/api', pedidoRoutes);
app.use('/api', mesaRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API del Restaurante Acomaina',
    version: '1.0.0',
    endpoints: {
      menu: '/api/menu',
      pedidos: '/api/pedidos',
      mesas: '/api/mesas'
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(` API disponible en http://localhost:${PORT}/api`);
});