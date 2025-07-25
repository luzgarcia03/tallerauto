import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const TipoMantenimientoEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    api.get(`/tipos-mantenimiento/${id}`)
      .then(res => setForm(res.data))
      .catch(() => {
        alert('No se pudo cargar el tipo');
        navigate('/tipo-mantenimiento');
      });
  }, [id, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.put(`/tipos-mantenimiento/${id}`, form)
      .then(() => {
        alert('Tipo de mantenimiento actualizado con éxito');
        navigate('/tipo-mantenimiento');
      })
      .catch(() => alert('Error al actualizar tipo'));
  };

  if (!form) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-edit me-2"></i>Editar Tipo de Mantenimiento</h4>
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
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-1"></i>Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TipoMantenimientoEditar;
