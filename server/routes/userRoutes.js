const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
const Notification = require('../models/Notification'); // Importa el modelo de notificaciones

// Endpoint para registrar un usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Validaciones
  if (!username || !email || !password) {
    return res.status(400).send('Todos los campos son obligatorios.');
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send('Ya existe un usuario con este correo.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Endpoint para iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Usuario no encontrado');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).send('Contraseña incorrecta');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.send({ user: { username: user.username, email: user.email }, token });
});

// Endpoint para seguir a un usuario
router.post('/:id/follow', authMiddleware, async (req, res) => {
  const userIdToFollow = req.params.id; // ID del usuario a seguir
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    if (userIdToFollow.toString() === user._id.toString()) {
      return res.status(400).send('No puedes seguirte a ti mismo');
    }

    if (user.following.includes(userIdToFollow)) {
      return res.status(400).send('Ya sigues a este usuario');
    }

    user.following.push(userIdToFollow);
    await user.save(); // Guardar los cambios

    // Crear notificación
    const notification = new Notification({
      user_id: userIdToFollow, // A quién va la notificación
      message: `${user.username} te ha seguido`, // Mensaje de la notificación
    });
    await notification.save(); // Guardar la notificación

    res.status(200).send(user); // Enviar el usuario actualizado
  } catch (error) {
    console.error('Error al seguir al usuario:', error);
    res.status(500).send(error);
  }
});

// Endpoint para dejar de seguir a un usuario
router.post('/:id/unfollow', authMiddleware, async (req, res) => {
  const userIdToUnfollow = req.params.id; // ID del usuario a dejar de seguir
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send('Usuario no encontrado');
    }

    if (!user.following.includes(userIdToUnfollow)) {
      return res.status(400).send('No sigues a este usuario');
    }

    user.following = user.following.filter(id => id.toString() !== userIdToUnfollow); // Remover de la lista
    await user.save(); // Guardar los cambios
    res.status(200).send(user); // Enviar el usuario actualizado
  } catch (error) {
    console.error('Error al dejar de seguir al usuario:', error);
    res.status(500).send(error);
  }
});
// Endpoint para buscar usuarios
router.get('/search', authMiddleware, async (req, res) => {
  const { query } = req.query; // Obtener la consulta desde la búsqueda
  try {
    const users = await User.find({
      username: { $regex: query, $options: 'i' } // Búsqueda insensible a mayúsculas
    });
    res.send(users); // Enviar la lista de usuarios encontrados
  } catch (error) {
    console.error('Error al buscar usuarios:', error);
    res.status(500).send(error); // Enviar error si ocurre
  }
});

module.exports = router;