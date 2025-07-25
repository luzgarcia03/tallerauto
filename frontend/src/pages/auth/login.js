import React, { useState } from 'react';
import api from '../../api/api';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', form);
      console.log('🔍 Respuesta del backend:', res.data);
      const { token, usuario, permisos } = res.data;
  
      if (token && usuario) {
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('permisos', JSON.stringify(permisos || []));
  
        alert('Inicio de sesión exitoso');
        window.location.href = '/'; // ✅ Redirección completa asegurando recarga
      } else {
        alert('Respuesta inválida del servidor');
      }
    } catch (err) {
      alert('Credenciales inválidas');
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-header bg-primary text-white text-center">
          <h4 className="mb-0"><i className="fas fa-user-lock me-2"></i>Iniciar Sesión</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Usuario</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-user"></i></span>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <div className="input-group">
                <span className="input-group-text"><i className="fas fa-lock"></i></span>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              <i className="fas fa-sign-in-alt me-2"></i>Entrar
            </button>
            <div className="text-center mt-3">
              <Link to="/register">¿No tienes cuenta? Regístrate aquí</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
