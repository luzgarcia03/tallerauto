import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const TipoMantenimientoCrear = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre_tipo: '', descripcion: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/tipos-mantenimiento', form)
      .then(() => {
        alert('✅ Tipo de mantenimiento creado con éxito');
        navigate('/tipo-mantenimiento');
      })
      .catch((err) => {
        console.error('Error al crear tipo de mantenimiento:', err);
        alert('❌ Error al crear tipo de mantenimiento');
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-plus-circle me-2"></i>Crear Tipo de Mantenimiento</h4>
          <button onClick={() => navigate('/tipo-mantenimiento')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Nombre del Tipo</label>
              <input
                type="text"
                name="nombre_tipo"
                className="form-control"
                value={form.nombre_tipo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label>Descripción</label>
              <textarea
                name="descripcion"
                className="form-control"
                value={form.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-save me-1"></i>Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TipoMantenimientoCrear;
