const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para poder recibir los platos y pedidos en formato JSON

// Ruta de prueba para ver que todo sople bien
app.get('/api/prueba', (req, res) => {
  res.json({ mensaje: "¡El backend de Acomaina está activo y conectado!" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});