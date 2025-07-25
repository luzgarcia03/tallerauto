import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const EstadoPagoEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre_estado: '', descripcion: '' });

  useEffect(() => {
    api.get(`/estados-pago/${id}`)
      .then(res => setForm(res.data))
      .catch(err => {
        console.error('Error al cargar estado de pago:', err);
        alert('No se pudo obtener el estado de pago');
        navigate('/estado-pago');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/estados-pago/${id}`, form) 
      .then(() => {
        alert('Estado de pago actualizado con éxito');
        navigate('/estado-pago');
      })
      .catch(err => {
        console.error('Error al actualizar estado de pago:', err);
        alert('Ocurrió un error al actualizar');
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-edit me-2"></i>Editar Estado de Pago</h4>
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
                value={form.nombre_estado}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                className="form-control"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-save me-1"></i>Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EstadoPagoEditar;
