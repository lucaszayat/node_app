import React, { useState } from 'react';
import './styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Manejo de errores

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(`Intentando iniciar sesión con: { email: '${email}', password: '${password}' }`); // Mensaje para debuggin

    const response = await fetch('http://localhost:5000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const { token } = await response.json(); // Obtener el token de la respuesta
      localStorage.setItem('token', token); // Almacenar el token en localStorage
      console.log('Inicio de sesión exitoso:', token); // Mensaje de éxito
      // Aquí puedes redirigir al usuario o manejar el estado de tu aplicación
    } else {
      const errorMessage = await response.text();
      setError(errorMessage); // Mostrar el error en pantalla
      console.error('Error de inicio de sesión:', errorMessage);
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
        {error && <p className="error">{error}</p>} {/* Mostrar error si existe */}
      </form>
    </div>
  );
};

export default Login;