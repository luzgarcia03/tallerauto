import React, { useEffect, useState } from 'react';
import api from '../../api/api'; // ✅ Cliente centralizado

const Perfil = () => {
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
    zona: ''
  });

  const [passwords, setPasswords] = useState({
    actual: '',
    nueva: '',
    confirmar: ''
  });

  // Obtener datos del usuario logueado
  useEffect(() => {
    api.get('/perfil')
      .then(res => {
        const persona = res.data.persona;
        setForm({ ...persona });
      })
      .catch(err => {
        console.error('Error al obtener perfil:', err);
        alert('No se pudo obtener la información del perfil.');
      });
  }, []);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordsChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const actualizarPerfil = (e) => {
    e.preventDefault();
    api.put('/perfil', form)
      .then(() => alert('Perfil actualizado correctamente'))
      .catch(err => {
        console.error(err);
        alert('Error al actualizar perfil');
      });
  };

  const actualizarContrasena = (e) => {
    e.preventDefault();
    api.put('/perfil/password', passwords)
      .then(() => {
        alert('Contraseña actualizada correctamente');
        setPasswords({ actual: '', nueva: '', confirmar: '' });
      })
      .catch(err => {
        console.error(err);
        alert('Error al actualizar contraseña');
      });
  };

  return (
    <div className="container mt-4">
      <div className="card shadow mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0"><i className="fas fa-user-circle me-2"></i>Información del Perfil</h5>
          <small className="text-light">Acá puede actualizar los datos del Usuario</small>
        </div>
        <div className="card-body">
          <form onSubmit={actualizarPerfil}>
            <div className="row">
              {[
                { name: 'primer_nombre', label: 'Primer Nombre', required: true },
                { name: 'segundo_nombre', label: 'Segundo Nombre' },
                { name: 'primer_apellido', label: 'Primer Apellido', required: true },
                { name: 'segundo_apellido', label: 'Segundo Apellido' },
                { name: 'fecha_nacimiento', label: 'Fecha de Nacimiento', type: 'date' },
                { name: 'telefono', label: 'Teléfono' },
                { name: 'email', label: 'Correo Electrónico' },
                { name: 'direccion', label: 'Dirección' },
                { name: 'municipio', label: 'Municipio' },
                { name: 'departamento', label: 'Departamento' },
                { name: 'zona', label: 'Zona' }
              ].map((field, i) => (
                <div className="col-md-6 mb-3" key={field.name}>
                  <label>{field.label}</label>
                  <input
                    type={field.type || 'text'}
                    className="form-control"
                    name={field.name}
                    value={field.name === 'fecha_nacimiento'
                      ? (form.fecha_nacimiento?.split('T')[0] || '')
                      : form[field.name]}
                    onChange={handleFormChange}
                    required={field.required}
                  />
                </div>
              ))}
            </div>
            <button className="btn btn-success"><i className="fas fa-save me-2"></i>Actualizar</button>
          </form>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header bg-info text-white">
          <h5 className="mb-0"><i className="fas fa-key me-2"></i>Actualizar Contraseña</h5>
          <small className="text-light">Recuerde utilizar una contraseña segura de 8 dígitos</small>
        </div>
        <div className="card-body">
          <form onSubmit={actualizarContrasena}>
            <div className="mb-3">
              <label>Contraseña actual</label>
              <input type="password" className="form-control" name="actual" value={passwords.actual} onChange={handlePasswordsChange} required />
            </div>
            <div className="mb-3">
              <label>Nueva Contraseña</label>
              <input type="password" className="form-control" name="nueva" value={passwords.nueva} onChange={handlePasswordsChange} required />
            </div>
            <div className="mb-3">
              <label>Confirme la nueva contraseña</label>
              <input type="password" className="form-control" name="confirmar" value={passwords.confirmar} onChange={handlePasswordsChange} required />
            </div>
            <button className="btn btn-primary"><i className="fas fa-lock me-2"></i>Actualizar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
