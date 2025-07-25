import React, { useEffect, useState } from 'react';
import api from '../../api/api'; 
import { useParams, useNavigate } from 'react-router-dom';

const ClienteEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [form, setForm] = useState(null);

  useEffect(() => {
    api.get('/estados')
      .then(res => setEstados(res.data))
      .catch(err => console.error('Error al cargar estados:', err));

    api.get(`/clientes/${id}`)
      .then(res => {
        const cliente = res.data; 
        setForm({
          ...cliente.persona,
          nit: cliente.nit,
          dpi: cliente.dpi,
          puntos_fidelidad: cliente.puntos_fidelidad
        });
      })
      .catch(err => {
        console.error('Error al cargar cliente:', err);
        alert('Error al cargar cliente');
        navigate('/cliente');
      });
  }, [id, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.put(`/clientes/${id}`, form)
      .then(() => {
        navigate('/cliente', {
          state: {
            mensaje: `Cliente "${form.primer_nombre} ${form.primer_apellido}" modificado con éxito`,
            tipo: 'success'
          }
        });
      })
      .catch(() => {
        navigate('/cliente', {
          state: {
            mensaje: 'Error al actualizar cliente',
            tipo: 'danger'
          }
        });
      });
  };

  if (!form) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-warning text-black d-flex align-items-center">
          <h4 className="card-title mb-0">
            <i className="fas fa-user-edit me-2"></i>Editar Cliente
          </h4>
          <button onClick={() => navigate('/cliente')} className="btn-black ms-auto">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <h5 className="text-warning mb-3"><i className="fas fa-id-card me-2"></i>Datos Personales</h5>
            <div className="row">
              <div className="col-md-6">
                <label>Primer Nombre</label>
                <input type="text" className="form-control" name="primer_nombre" value={form.primer_nombre} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label>Segundo Nombre</label>
                <input type="text" className="form-control" name="segundo_nombre" value={form.segundo_nombre} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Primer Apellido</label>
                <input type="text" className="form-control" name="primer_apellido" value={form.primer_apellido} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label>Segundo Apellido</label>
                <input type="text" className="form-control" name="segundo_apellido" value={form.segundo_apellido} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Fecha Nacimiento</label>
                <input type="date" className="form-control" name="fecha_nacimiento" value={form.fecha_nacimiento} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Teléfono</label>
                <input type="text" className="form-control" name="telefono" value={form.telefono} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
              </div>
            </div>

            <hr />
            <h5 className="text-warning mb-3 mt-4"><i className="fas fa-map-marker-alt me-2"></i>Dirección</h5>
            <div className="row">
              <div className="col-md-6">
                <label>Dirección</label>
                <input type="text" className="form-control" name="direccion" value={form.direccion} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>Municipio</label>
                <input type="text" className="form-control" name="municipio" value={form.municipio} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>Departamento</label>
                <input type="text" className="form-control" name="departamento" value={form.departamento} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>Zona</label>
                <input type="text" className="form-control" name="zona" value={form.zona} onChange={handleChange} />
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

            <hr />
            <h5 className="text-warning mb-3 mt-4"><i className="fas fa-address-book me-2"></i>Información del Cliente</h5>
            <div className="row">
              <div className="col-md-3">
                <label>NIT</label>
                <input type="text" className="form-control" name="nit" value={form.nit} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>DPI</label>
                <input type="text" className="form-control" name="dpi" value={form.dpi} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>Puntos de Fidelidad</label>
                <input type="number" className="form-control" name="puntos_fidelidad" value={form.puntos_fidelidad} onChange={handleChange} />
              </div>
            </div>

            <div className="text-end mt-4">
              <button type="submit" className="btn btn-warning">
                <i className="fas fa-save me-2"></i>Actualizar Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ClienteEditar;
