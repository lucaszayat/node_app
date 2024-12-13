const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Cargar las variables de entorno
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log("Intentando conectar a MongoDB...");

// Conectar a MongoDB Atlas
const uri = process.env.MONGO_URI;

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB conectado'); // Mensaje para confirmar la conexión
  })
  .catch(err => {
    console.error('Error de conexión', err); // Mensaje de error si la conexión falla
  });

// Importar Rutas
const userRoutes = require('./routes/userRoutes'); // Rutas de usuario
const videoRoutes = require('./routes/videoRoutes'); // Rutas de video

// Usar Rutas
app.use('/api/users', userRoutes);  // Ruta para manejar usuarios (registro, inicio de sesión)
app.use('/api/videos', videoRoutes); // Ruta para manejar videos (carga, obtención)

// Definir el puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});