import React, { useState } from 'react';
import api from '../../api/api'; 
import { useNavigate } from 'react-router-dom';

const CategoriaRepuestoCrear = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre_categoria: '', descripcion: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/categorias-repuesto', form)
      .then(() => {
        alert("Categoría creada con éxito");
        navigate('/categoria-repuesto');
      })
      .catch(err => {
        console.error(err);
        alert("Error al crear categoría");
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-plus-circle me-2"></i>Crear Categoría</h4>
          <button onClick={() => navigate('/categoria-repuesto')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <label>Nombre de Categoría</label>
            <input
              type="text"
              className="form-control mb-3"
              name="nombre_categoria"
              required
              value={form.nombre_categoria}
              onChange={handleChange}
            />
            <label>Descripción</label>
            <textarea
              className="form-control mb-3"
              name="descripcion"
              rows="3"
              value={form.descripcion}
              onChange={handleChange}
            ></textarea>
            <button className="btn btn-success" type="submit">
              <i className="fas fa-save me-1"></i>Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriaRepuestoCrear;
