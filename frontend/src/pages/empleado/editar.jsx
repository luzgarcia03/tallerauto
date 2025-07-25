import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const EmpleadoEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    api.get(`/empleados/${id}`)
      .then(res => setForm(res.data))
      .catch(() => {
        alert('No se pudo cargar el empleado');
        navigate('/empleado');
      });
  
    api.get('/estados')
      .then(res => setEstados(res.data));
  }, [id, navigate]);
  

  const handleChange = e => {
    const { name, value } = e.target;

    if (name.startsWith('persona.')) {
      const field = name.split('.')[1];
      setForm({
        ...form,
        persona: {
          ...form.persona,
          [field]: value
        }
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.put(`/api/empleados/${id}`, form)
      .then(() => {
        alert('Empleado actualizado correctamente');
        navigate('/empleado');
      })
      .catch(() => alert('Error al actualizar empleado'));
  };

  if (!form) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-edit me-2"></i>Editar Empleado</h4>
          <button onClick={() => navigate('/empleado')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label>Primer Nombre</label>
                <input type="text" name="persona.primer_nombre" className="form-control" value={form.persona.primer_nombre} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label>Primer Apellido</label>
                <input type="text" name="persona.primer_apellido" className="form-control" value={form.persona.primer_apellido} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label>Teléfono</label>
                <input type="text" name="persona.telefono" className="form-control" value={form.persona.telefono} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Email</label>
                <input type="email" name="persona.email" className="form-control" value={form.persona.email} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Código Empleado</label>
                <input type="text" name="codigo_empleado" className="form-control" value={form.codigo_empleado} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label>Fecha Contratación</label>
                <input type="date" name="fecha_contratacion" className="form-control" value={form.fecha_contratacion} onChange={handleChange} required />
              </div>
              <div className="col-md-4">
                <label>Estado</label>
                <select name="id_estado" className="form-control" value={form.id_estado} onChange={handleChange} required>
                  <option value="">Seleccione...</option>
                  {estados.map(e => (
                    <option key={e.id_estado} value={e.id_estado}>{e.nombre_estado}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-end mt-3">
              <button type="submit" className="btn btn-warning"><i className="fas fa-save me-1"></i>Actualizar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpleadoEditar;
