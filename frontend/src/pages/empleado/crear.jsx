import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
const EmpleadoCrear = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  const [form, setForm] = useState({
    persona: {
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
      password: '',
      id_estado: ''
    },
    codigo_empleado: '',
    fecha_contratacion: '',
    id_estado: '' // Esto también es importante si el empleado tiene estado aparte de la persona
  });

  useEffect(() => {
    api.get('/estados')
    .then(res => setEstados(res.data))
      .catch(err => console.error('Error al cargar estados:', err));
  }, [API_URL]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ([
      'primer_nombre', 'segundo_nombre', 'primer_apellido', 'segundo_apellido',
      'fecha_nacimiento', 'telefono', 'email', 'direccion',
      'municipio', 'departamento', 'zona', 'password', 'id_estado'
    ].includes(name)) {
      // Actualizamos los datos de la persona
      setForm({
        ...form,
        persona: {
          ...form.persona,
          [name]: value
        },
        // Si cambia el estado, sincronizamos también el del empleado
        ...(name === 'id_estado' ? { id_estado: value } : {})
      });
    } else {
      setForm({
        ...form,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post('/empleados', form)
    .then(() => {
        alert('Empleado creado con éxito');
        navigate('/empleado');
      })
      .catch(() => alert('Error al crear empleado'));
  };
  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-user-plus me-2"></i> Crear Empleado</h4>
          <button onClick={() => navigate('/empleado')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* Campos de Persona */}
              <div className="col-md-6">
                <label>Primer Nombre</label>
                <input type="text" name="primer_nombre" className="form-control" value={form.persona.primer_nombre} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label>Segundo Nombre</label>
                <input type="text" name="segundo_nombre" className="form-control" value={form.persona.segundo_nombre} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Primer Apellido</label>
                <input type="text" name="primer_apellido" className="form-control" value={form.persona.primer_apellido} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label>Segundo Apellido</label>
                <input type="text" name="segundo_apellido" className="form-control" value={form.persona.segundo_apellido} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Fecha de Nacimiento</label>
                <input type="date" name="fecha_nacimiento" className="form-control" value={form.persona.fecha_nacimiento} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Teléfono</label>
                <input type="text" name="telefono" className="form-control" value={form.persona.telefono} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Email</label>
                <input type="email" name="email" className="form-control" value={form.persona.email} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Dirección</label>
                <input type="text" name="direccion" className="form-control" value={form.persona.direccion} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>Municipio</label>
                <input type="text" name="municipio" className="form-control" value={form.persona.municipio} onChange={handleChange} />
              </div>
              <div className="col-md-3">
                <label>Departamento</label>
                <input type="text" name="departamento" className="form-control" value={form.persona.departamento} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Zona</label>
                <input type="text" name="zona" className="form-control" value={form.persona.zona} onChange={handleChange} />
              </div>

              {/* Campos de Empleado */}
              <div className="col-md-6">
                <label>Código Empleado</label>
                <input type="text" name="codigo_empleado" className="form-control" value={form.codigo_empleado} onChange={handleChange} required />
              </div>
              <div className="col-md-6">
                <label>Fecha Contratación</label>
                <input type="date" name="fecha_contratacion" className="form-control" value={form.fecha_contratacion} onChange={handleChange} required />
              </div>

              {/* Estado */}
              <div className="col-md-4">
                <label>Estado</label>
                <select name="id_estado" className="form-control" value={form.persona.id_estado} onChange={handleChange}>
  <option value="">Seleccione...</option>
  {estados.map(e => (
    <option key={e.id_estado} value={e.id_estado}>{e.nombre_estado}</option>
  ))}
</select>

              </div>
              {/* Contraseña */}
              <div className="col-md-6">
                <label>Contraseña</label>
                <input type="password" name="password" className="form-control" value={form.persona.password} onChange={handleChange} required />
              </div>
            </div>

            <div className="text-end mt-3">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-save me-1"></i> Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpleadoCrear;
