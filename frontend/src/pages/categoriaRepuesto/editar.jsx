import React, { useEffect, useState } from 'react';
import api from '../../api/api'; 
import { useNavigate, useParams } from 'react-router-dom';

const CategoriaRepuestoEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre_categoria: '', descripcion: '' });

  useEffect(() => {
    api.get(`/categorias-repuesto/${id}`)
      .then(res => setForm(res.data))
      .catch(err => {
        console.error(err);
        alert("No se pudo obtener la categoría");
        navigate('/categoria-repuesto');
      });
  }, [id, navigate]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    api.put(`/categorias-repuesto/${id}`, form)
      .then(() => {
        alert("Categoría actualizada");
        navigate('/categoria-repuesto');
      })
      .catch(err => {
        console.error(err);
        alert("Error al actualizar la categoría");
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-edit me-2"></i>Editar Categoría</h4>
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
              value={form.nombre_categoria}
              onChange={handleChange}
            />
            <label>Descripción</label>
            <textarea
              className="form-control mb-3"
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
            ></textarea>
            <button className="btn btn-warning" type="submit">
              <i className="fas fa-save me-1"></i>Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriaRepuestoEditar;
