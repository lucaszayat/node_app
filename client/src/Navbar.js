import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Navbar.css'; // Asegúrate de importar los estilos

const Navbar = () => {
  return (
    <div className="bottom-navbar">
      <Link to="/">Home</Link>
      <Link to="/friends">Friends</Link>
      <button className="create-button">+</button> {/* Botón más grande para "Crear" */}
      <Link to="/inbox">Inbox</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default Navbar;