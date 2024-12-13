import React, { useState } from 'react';
import './styles/VideoUpload.css';

const VideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null); // Para almacenar el archivo del video
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState([]);

  const handleFileChange = (e) => {
    setVideoFile(e.target.files[0]); // Actualiza el estado con el archivo seleccionado
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value); // Actualiza el estado con la descripción del video
  };

  const handleHashtagsChange = (e) => {
    const hashtags = e.target.value.split(',').map(tag => tag.trim());
    setHashtags(hashtags); // Actualiza el estado con los hashtags
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // Crear un FormData para subir el archivo
    formData.append('video', videoFile); // Agregar el archivo al FormData
    formData.append('description', description); // Agregar la descripción
    formData.append('hashtags', JSON.stringify(hashtags)); // Convertir los hashtags a una cadena y agregar

    try {
      const response = await fetch('http://localhost:5000/api/videos', {
        method: 'POST',
        body: formData // Enviar el FormData
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Video subido:', data);
        // Resetea el formulario o realiza otra acción después de incluir el video
      } else {
        throw new Error('Error al subir el video');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        accept="video/*" // Solo permite archivos de video
        onChange={handleFileChange}
        required
      />
      <input
        type="text"
        placeholder="Descripción del video"
        value={description}
        onChange={handleDescriptionChange}
      />
      <input
        type="text"
        placeholder="Hashtags (separados por comas)"
        onChange={handleHashtagsChange}
      />
      <button type="submit">Subir Video</button>
    </form>
  );
};

export default VideoUpload;