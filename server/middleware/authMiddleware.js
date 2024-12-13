const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ajusta la ruta según tu estructura

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtenemos el token

  if (!token) {
    return res.status(401).send('Acceso denegado. No se proporcionó token.'); // Si no hay token
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verifica el token
    req.user = await User.findById(verified.id); // Busca al usuario
    if (!req.user) {
      return res.status(404).send('Usuario no encontrado'); // Verifica que el usuario existe
    }
    next(); // Pasa al siguiente middleware
  } catch (error) {
    res.status(400).send('Token inválido'); // Maneja el error si el token es inválido
  }
};

module.exports = authMiddleware; // Asegúrate de exportar el middleware