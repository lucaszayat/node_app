const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const multer = require('multer');

// Configuraciones de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Aquí se guardarán los archivos; asegúrate de que la carpeta exista
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Agregar una marca de tiempo para evitar conflictos de nombres
  }
});

const upload = multer({ storage: storage });

// Endpoint para subir un video
router.post('/', upload.single('video'), async (req, res) => {
  try {
    const video = new Video({
      user_id: req.body.user_id, // Debes enviar el user_id desde el frontend
      url_video: req.file.path, // Guardar la ruta del archivo subido
      description: req.body.description,
      hashtags: JSON.parse(req.body.hashtags), // Convertir los hashtags de JSON a un array
      likes: 0,
      comments: []
    });
    
    await video.save();
    res.status(201).send(video); // Enviar el video creado como respuesta
  } catch (error) {
    console.error('Error al guardar el video:', error); // Imprimir error en consola
    res.status(400).send(error); // Enviar un error si ocurre
  }
});

// Endpoint para obtener todos los videos
router.get('/', async (req, res) => {
  try {
    const videos = await Video.find().populate('user_id', 'username email'); // Poblamos el usuario para mostrar información adicional
    res.send(videos); // Enviar la lista de videos como respuesta
  } catch (error) {
    console.error('Error al obtener videos:', error); // Imprimir error en consola
    res.status(500).send(error); // Enviar error si ocurre
  }
});

module.exports = router;