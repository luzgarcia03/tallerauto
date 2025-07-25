import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
const Navbar = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ primer_nombre: '', primer_apellido: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsuario({
          primer_nombre: decoded.primer_nombre,
          primer_apellido: decoded.primer_apellido,
        });
      } catch (error) {
        console.error('Token inválido');
      }
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Botón para el sidebar */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      {/* Menú usuario alineado a la derecha */}
      <ul className="navbar-nav ms-auto">
        <li className="nav-item dropdown">
          <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
            <i className="fas fa-user-circle me-1"></i>
            {usuario.primer_nombre} {usuario.primer_apellido}
          </a>
          <div className="dropdown-menu dropdown-menu-end">
            <Link className="dropdown-item" to="/perfil">
              <i className="fas fa-id-badge me-2"></i> Ver Perfil
            </Link>
            <div className="dropdown-divider"></div>
            <button className="dropdown-item text-danger" onClick={cerrarSesion}>
              <i className="fas fa-sign-out-alt me-2"></i> Cerrar Sesión
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
