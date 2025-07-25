import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const ProveedorCrear = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [form, setForm] = useState({
    nombre_proveedor: '',
    contacto_principal: '',
    telefono: '',
    email: '',
    direccion: '',
    nit: '',
    id_estado: ''
  });

  useEffect(() => {
    api.get('/estados')
      .then(res => setEstados(res.data))
      .catch(err => console.error('Error al cargar estados:', err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/proveedores', form)
      .then(() => {
        alert('✅ Proveedor creado con éxito');
        navigate('/proveedor');
      })
      .catch(err => {
        console.error('Error al crear proveedor:', err);
        alert('❌ Error al crear proveedor');
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-plus-circle me-2"></i>Crear Proveedor</h4>
          <button onClick={() => navigate('/proveedor')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label>Nombre Proveedor</label>
                <input type="text" name="nombre_proveedor" className="form-control" required onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Contacto Principal</label>
                <input type="text" name="contacto_principal" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Teléfono</label>
                <input type="text" name="telefono" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Email</label>
                <input type="email" name="email" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>NIT</label>
                <input type="text" name="nit" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-8">
                <label>Dirección</label>
                <input type="text" name="direccion" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Estado</label>
                <select className="form-control" name="id_estado" required onChange={handleChange}>
                  <option value="">Seleccione...</option>
                  {estados.map(e => (
                    <option key={e.id_estado} value={e.id_estado}>{e.nombre_estado}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-3">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-save me-1"></i> Guardar Proveedor
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProveedorCrear;
