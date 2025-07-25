import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const Crear = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre_estado: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/estados-pago', form)
      .then(() => {
        alert('Estado de pago creado correctamente');
        navigate('/estado-pago');
      })
      .catch(err => {
        console.error('Error al crear estado de pago:', err);
        alert('Ocurrió un error al guardar');
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-plus me-2"></i>Crear Estado de Pago</h4>
          <button onClick={() => navigate('/estado-pago')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre del Estado</label>
              <input
                type="text"
                className="form-control"
                name="nombre_estado"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              <i className="fas fa-save me-1"></i>Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Crear;
