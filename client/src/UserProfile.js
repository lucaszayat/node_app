import React, { useEffect, useState } from 'react';

const UserProfile = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Comprobar si ya se está siguiendo al usuario (puedes implementar lógica para esto)
  }, [user]);

  const handleFollow = async () => { Aquí está cómo terminar de implementar la funcionalidad para seguir y dejar de seguir a otros usuarios en el componente `UserProfile.js`.

### Completar `UserProfile.js`

Este archivo representará el perfil de un usuario y permitirá al usuario autenticado seguir o dejar de seguir a otros usuarios.

#### Código Completo para `UserProfile.js`

```javascript
import React, { useEffect, useState } from 'react';

const UserProfile = ({ user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    // Comprobar si actualmente el usuario autenticado sigue a este usuario
    const checkFollowingStatus = async () => {
      // Aquí, debes consultar el usuario autenticado y verificar la lista de 'following'
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users/me', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        const currentUser = await response.json();
        setIsFollowing(currentUser.following.includes(user._id)); // Verificar si se sigue al usuario
      }
    };

    checkFollowingStatus();
  }, [user]);

  const handleFollow = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}/follow`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setIsFollowing(true); // Actualiza el estado
      } else {
        const error = await response.text();
        console.error('Error al seguir al usuario:', error); // Maneja el error
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  const handleUnfollow = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/users/${user._id}/unfollow`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.ok) {
        setIsFollowing(false); // Actualiza el estado
      } else {
        const error = await response.text();
        console.error('Error al dejar de seguir al usuario:', error); // Maneja el error
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div>
      <h2>Perfil de {user.username}</h2>
      <p>Email: {user.email}</p>
      {isFollowing ? (
        <button onClick={handleUnfollow}>Dejar de Seguir</button>
      ) : (
        <button onClick={handleFollow}>Seguir</button>
      )}
      {/* Aquí puedes agregar más acciones relacionadas al perfil */}
    </div>
  );
};

export default UserProfile;