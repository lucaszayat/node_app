import React, { useState } from 'react';
import './styles/Video.css';

const Video = ({ video }) => {
  const [likes, setLikes] = useState(video.likes);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(video.comments || []);
  const [showCommentBox, setShowCommentBox] = useState(false); // Controlar la visibilidad del cuadro de comentarios

  const handleLike = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/videos/${video._id}/like`, {
        method: 'POST',
      });

      if (response.ok) {
        setLikes(likes + 1); // Incrementar el contador de likes
      } else {
        console.error('Error al dar like al video');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/videos/${video._id}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: "put_current_user_id_here", comment }) // Asegúrate de proporcionar el ID del usuario actual
      });

      if (response.ok) {
        const updatedVideo = await response.json();
        setComments(updatedVideo.comments); // Actualiza la lista de comentarios
        setComment(''); // Restablece el campo de comentario
      } else {
        console.error('Error al agregar comentario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="video-container">
      <video width="100%" controls autoPlay>
        <source src={video.url_video} type="video/mp4" />
        Tu navegador no soporta el elemento de video.
      </video>

      <div className="video-interactions">
        <button onClick={handleLike}>
          <span role="img" aria-label="Corazón">❤️</span> {likes} {/* Solo mostrar el número de likes */}
        </button>
        
        <div>
          <button onClick={() => setShowCommentBox(!showCommentBox)}>
            💬 {showCommentBox && (
              <span>{comments.length > 0 ? comments.length : ''}</span> // Mostrar número solo si hay comentarios
            )}
          </button>
          {showCommentBox && (
            <div>
              <form onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Escribe un comentario..."
                  required
                />
                <button type="submit">Comentar</button>
              </form>
              <div>
                <h4>Comentarios:</h4>
                {comments.length > 0 ? (
                  comments.map((c, index) => (
                    <p key={index}>{c}</p>
                  ))
                ) : (
                  <p>No hay comentarios.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;