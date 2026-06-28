const express = require('express');
const cors = require('cors');
const menuRoutes = require('./src/routes/menuRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', menuRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});