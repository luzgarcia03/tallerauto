import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; 
const ProveedorEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    // Obtener estados
    api.get('/estados')
      .then(res => setEstados(res.data))
      .catch(err => console.error('Error al cargar estados:', err));

    // Obtener proveedor
    api.get(`/proveedores/${id}`)
      .then(res => setForm(res.data))
      .catch(err => {
        console.error('Error al cargar proveedor:', err);
        alert('No se pudo cargar el proveedor');
        navigate('/proveedor');
      });
  }, [id, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.put(`/proveedores/${id}`, form)
      .then(() => {
        alert('Proveedor actualizado con éxito');
        navigate('/proveedor');
      })
      .catch(err => {
        console.error('Error al actualizar proveedor:', err);
        alert('Ocurrió un error al actualizar el proveedor');
      });
  };

  if (!form) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-edit me-2"></i>Editar Proveedor</h4>
          <button onClick={() => navigate('/proveedor')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label>Nombre del Proveedor</label>
                <input type="text" className="form-control" name="nombre_proveedor" value={form.nombre_proveedor} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label>Contacto Principal</label>
                <input type="text" className="form-control" name="contacto_principal" value={form.contacto_principal} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label>Teléfono</label>
                <input type="text" className="form-control" name="telefono" value={form.telefono} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label>Correo Electrónico</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label>Dirección</label>
                <input type="text" className="form-control" name="direccion" value={form.direccion} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>NIT</label>
                <input type="text" className="form-control" name="nit" value={form.nit} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>Estado</label>
                <select className="form-control" name="id_estado" value={form.id_estado} onChange={handleChange} required>
                  <option value="">Seleccione...</option>
                  {estados.map(e => (
                    <option key={e.id_estado} value={e.id_estado}>{e.nombre_estado}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-1"></i> Actualizar Proveedor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProveedorEditar;
