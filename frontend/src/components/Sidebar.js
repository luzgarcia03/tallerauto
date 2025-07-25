import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
const Sidebar = () => {
  const [usuario, setUsuario] = useState({ username: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsuario(decoded);
      } catch (error) {
        console.error('Token inválido');
      }
    }
  }, []);

  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link">
        <span className="brand-text font-weight-light">Taller Automotriz</span>
      </Link>

      <div className="sidebar">
        {/* Usuario */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">
  <div className="image">
    <img 
      src="https://cdn-icons-png.flaticon.com/512/149/149071.png" 
      alt="User" 
      className="img-circle elevation-2"
      style={{ width: '35px', height: '35px', objectFit: 'cover' }}
    />
  </div>
  <div className="info">
    <Link to="/perfil" className="d-block text-white fw-bold">
      {usuario.primer_nombre || usuario.username || 'Usuario'}
    </Link>
  </div>
</div>

        {/* Menú */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="nav-icon fas fa-home"></i>
                <p>Dashboard</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/usuarios" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Usuarios</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cliente" className="nav-link">
                <i className="nav-icon fas fa-users"></i>
                <p>Clientes</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/estado" className="nav-link">
                <i className="nav-icon fas fa-toggle-on"></i>
                <p>Estados</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/proveedor" className="nav-link">
                <i className="nav-icon fas fa-truck"></i>
                <p>Proveedores</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/categoria-repuesto" className="nav-link">
                <i className="nav-icon fas fa-cogs"></i>
                <p>Categorías Repuesto</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/repuesto" className="nav-link">
                <i className="nav-icon fas fa-tools"></i>
                <p>Repuestos</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/marca-vehiculo" className="nav-link">
                <i className="nav-icon fas fa-car"></i>
                <p>Marca Vehículo</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tipo-vehiculo" className="nav-link">
                <i className="nav-icon fas fa-car-side"></i>
                <p>Tipo Vehículo</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/empleado" className="nav-link">
                <i className="nav-icon fas fa-user-tie"></i>
                <p>Empleados</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/tipo-mantenimiento" className="nav-link">
                <i className="nav-icon fas fa-wrench"></i>
                <p>Tipo Mantenimiento</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/estado-pago" className="nav-link">
                <i className="nav-icon fas fa-money-check-alt"></i>
                <p>Estado de Pago</p>
              </Link>
            </li>
                    <li className="nav-item">
          <Link to="/estado-general" className="nav-link">
            <i className="nav-icon fas fa-chart-pie"></i>
            <p>Estado General</p>
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/servicios" className="nav-link">
            <i className="nav-icon fas fa-concierge-bell"></i>
            <p>Servicios</p>
          </Link>
        </li>


        <li className="nav-item">
  <Link to="/categorias-herramienta" className="nav-link">
  <i className="nav-icon fas fa-toolbox me-2"></i>
  <p className="mb-0">Categoría Herramienta</p>
  </Link>
</li>

<li className="nav-item">
  <Link to="/solicitud-herramienta" className="nav-link">
  <i className="nav-icon fas fa-toolbox me-2"></i>
  <p className="mb-0">Solicitud Herramienta</p>
  </Link>
</li>




          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
