import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import tienePermiso from '../../utils/tienePermiso';

const ClienteCrear = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!tienePermiso('cliente.crear')) {
      navigate('/no-autorizado'); 
    }
  }, []);
  const [estados, setEstados] = useState([]);

  const [form, setForm] = useState({
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    telefono: '',
    email: '',
    direccion: '',
    municipio: '',
    departamento: '',
    zona: '',
    id_estado: '',
    password: '',
    nit: '',
    dpi: '',
    puntos_fidelidad: 0
  });

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    api.get('/estados')
    .then(res => setEstados(res.data))
      .catch(err => console.error('Error al cargar estados:', err));
  }, [API_URL]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/clientes', form)
    .then(() => {
        alert('✅ Cliente creado con éxito!');
        navigate('/cliente');
      })
      .catch(err => {
        console.error('Error al crear cliente:', err);
        alert('❌ Ocurrió un error al crear el cliente.');
      });
  };


  return (
    <div className="container mt-4">
      <div className="card card-primary">
      <div className="card card-primary shadow">
      <div className="card-header d-flex align-items-center">
  <h3 className="card-title mb-0">
    <i className="fas fa-user-plus me-2"></i> Crear Cliente
  </h3>
  <button
    onClick={() => navigate('/cliente')}
    className="btn-white ms-auto"
  >
    <i className="fas fa-arrow-left me-1"></i> Volver
  </button>
</div>

  <div className="card-body">
    {/* Aquí va tu formulario */}
  </div>
</div>

        <form onSubmit={handleSubmit}>
          <div className="card-body">
            
            {/* Sección: Datos Personales */}
            <h5 className="text-primary mb-3"><i className="fas fa-id-card-alt me-2"></i>Datos Personales</h5>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Primer Nombre</label>
                <input type="text" className="form-control" name="primer_nombre" onChange={handleChange} required />
              </div>
              <div className="form-group col-md-6">
                <label>Segundo Nombre</label>
                <input type="text" className="form-control" name="segundo_nombre" onChange={handleChange} />
              </div>
              <div className="form-group col-md-6">
                <label>Primer Apellido</label>
                <input type="text" className="form-control" name="primer_apellido" onChange={handleChange} required />
              </div>
              <div className="form-group col-md-6">
                <label>Segundo Apellido</label>
                <input type="text" className="form-control" name="segundo_apellido" onChange={handleChange} />
              </div>
              <div className="form-group col-md-4">
                <label>Fecha Nacimiento</label>
                <input type="date" className="form-control" name="fecha_nacimiento" onChange={handleChange} />
              </div>
              <div className="form-group col-md-4">
                <label>Teléfono</label>
                <input type="text" className="form-control" name="telefono" onChange={handleChange} />
              </div>
              <div className="form-group col-md-4">
                <label>Email</label>
                <input type="email" className="form-control" name="email" onChange={handleChange} required />
              </div>
            </div>

            {/* Sección: Dirección */}
            <h5 className="text-primary mt-4 mb-3"><i className="fas fa-map-marker-alt me-2"></i>Dirección</h5>
            <div className="row">
              <div className="form-group col-md-6">
                <label>Dirección</label>
                <input type="text" className="form-control" name="direccion" onChange={handleChange} />
              </div>
              <div className="form-group col-md-3">
                <label>Municipio</label>
                <input type="text" className="form-control" name="municipio" onChange={handleChange} />
              </div>
              <div className="form-group col-md-3">
                <label>Departamento</label>
                <input type="text" className="form-control" name="departamento" onChange={handleChange} />
              </div>
              <div className="form-group col-md-3">
                <label>Zona</label>
                <input type="text" className="form-control" name="zona" onChange={handleChange} />
              </div>
              <div className="form-group col-md-3">
                <label>Estado</label>
                <select className="form-control" name="id_estado" onChange={handleChange} required>
                  <option value="">Seleccione...</option>
                  {estados.map(e => (
                    <option key={e.id_estado} value={e.id_estado}>{e.nombre_estado}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-3">
                <label>Contraseña</label>
                <input type="password" className="form-control" name="password" onChange={handleChange} required />
              </div>
            </div>

            {/* Sección: Datos de Cliente */}
            <h5 className="text-primary mt-4 mb-3"><i className="fas fa-address-card me-2"></i>Datos Cliente</h5>
            <div className="row">
              <div className="form-group col-md-4">
                <label>NIT</label>
                <input type="text" className="form-control" name="nit" onChange={handleChange} />
              </div>
              <div className="form-group col-md-4">
                <label>DPI</label>
                <input type="text" className="form-control" name="dpi" onChange={handleChange} />
              </div>
              <div className="form-group col-md-4">
                <label>Puntos de Fidelidad</label>
                <input type="number" className="form-control" name="puntos_fidelidad" onChange={handleChange} />
              </div>
            </div>
          </div>

          <div className="card-footer d-flex justify-content-end">
            <button type="submit" className="btn btn-success">
              <i className="fas fa-save me-2"></i>Guardar Cliente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClienteCrear;
