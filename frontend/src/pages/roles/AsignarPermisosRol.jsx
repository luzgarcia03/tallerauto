import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api/api'; 

const AsignarPermisosRol = () => {
  const { id } = useParams();

  const [todosPermisos, setTodosPermisos] = useState([]);
  const [permisosAsignados, setPermisosAsignados] = useState([]);
  const [nombreRol, setNombreRol] = useState('');

  useEffect(() => {
    // Obtener todos los permisos
    api.get('/permisos')
      .then(res => setTodosPermisos(res.data))
      .catch(err => console.error('Error al cargar permisos:', err));

    // Obtener permisos asignados al rol
    api.get(`/roles/${id}`)
      .then(res => {
        setPermisosAsignados(res.data.permisos || []);
        setNombreRol(res.data.nombre_rol);
      })
      .catch(err => console.error('Error al cargar rol:', err));
  }, [id]);

  const togglePermiso = async (permiso) => {
    try {
      if (permisosAsignados.includes(permiso)) {
        await api.delete(`/roles/${id}/permisos`, {
          data: { permiso }
        });
        setPermisosAsignados(permisosAsignados.filter(p => p !== permiso));
      } else {
        await api.post(`/roles/${id}/permisos`, { permiso });
        setPermisosAsignados([...permisosAsignados, permiso]);
      }
    } catch (error) {
      console.error('Error al asignar permiso:', error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="fas fa-key me-2"></i>Asignar Permisos al Rol: {nombreRol}
          </h4>
        </div>
        <div className="card-body">
          <div className="row">
            {todosPermisos.map((permiso, index) => (
              <div className="col-md-4 mb-2" key={index}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`permiso-${index}`}
                    checked={permisosAsignados.includes(permiso)}
                    onChange={() => togglePermiso(permiso)}
                  />
                  <label className="form-check-label" htmlFor={`permiso-${index}`}>
                    {permiso}
                  </label>
                </div>
              </div>
            ))}
            {todosPermisos.length === 0 && (
              <p className="text-muted">No hay permisos disponibles</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsignarPermisosRol;
