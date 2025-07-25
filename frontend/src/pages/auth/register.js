import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: '',
    rol_id: 1,
    estado_usuario_id: 1,
    persona: {
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      fecha_nacimiento: '',
      telefono: '',
      email: '',
      direccion: '',
      municipio: '',
      departamento: '',
      zona: '',
      id_estado: 1
    }
  });

  const handleChange = (e) => {
    if (e.target.name in form.persona) {
      setForm({
        ...form,
        persona: { ...form.persona, [e.target.name]: e.target.value }
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, form);
      alert('Registrado correctamente');
      navigate('/login');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4 className="mb-0"><i className="fas fa-user-plus me-2"></i>Registro de Usuario</h4>
              <small>Complete los siguientes campos para crear una cuenta</small>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <h5 className="text-secondary mb-3">📋 Información Personal</h5>
                <div className="row">
                  {[
                    { label: 'Primer Nombre', name: 'primer_nombre', col: 6 },
                    { label: 'Segundo Nombre', name: 'segundo_nombre', col: 6 },
                    { label: 'Primer Apellido', name: 'primer_apellido', col: 6 },
                    { label: 'Segundo Apellido', name: 'segundo_apellido', col: 6 },
                    { label: 'Fecha de Nacimiento', name: 'fecha_nacimiento', type: 'date', col: 4 },
                    { label: 'Teléfono', name: 'telefono', col: 4 },
                    { label: 'Email', name: 'email', col: 4 },
                    { label: 'Dirección', name: 'direccion', col: 4 },
                    { label: 'Municipio', name: 'municipio', col: 4 },
                    { label: 'Departamento', name: 'departamento', col: 4 },
                    { label: 'Zona', name: 'zona', col: 4 }
                  ].map(({ label, name, type = 'text', col }) => (
                    <div key={name} className={`col-md-${col} mb-3`}>
                      <label className="form-label">{label}</label>
                      <input
                        type={type}
                        className="form-control"
                        name={name}
                        value={form.persona[name]}
                        onChange={handleChange}
                        required={name === 'primer_nombre' || name === 'primer_apellido'}
                      />
                    </div>
                  ))}
                </div>

                <hr className="my-4" />
                <h5 className="text-secondary mb-3">🔐 Datos de Acceso</h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label>Nombre de Usuario</label>
                    <input className="form-control" name="username" value={form.username} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label>Contraseña</label>
                    <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
                  </div>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-success me-2">
                    <i className="fas fa-check-circle me-1"></i>Registrarse
                  </button>
                  <Link to="/login" className="btn btn-outline-secondary">
                    ¿Ya tienes cuenta? Inicia sesión
                  </Link>
                </div>
              </form>
            </div>
            <div className="card-footer text-muted text-center small">
              &copy; 2025 Taller Automotriz. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
