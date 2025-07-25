import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const EmpleadoIndex = () => {
  const [empleados, setEmpleados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/empleados')
      .then(res => setEmpleados(res.data))
      .catch(err => console.error('Error al obtener empleados:', err));
  }, []);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-users me-2"></i>Empleados</h4>
          <button className="btn btn-light" onClick={() => navigate('/empleado/crear')}>
            <i className="fas fa-plus me-1"></i> Crear Empleado
          </button>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Código</th>
                <th>Fecha Contratación</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {empleados.map((e, index) => (
                <tr key={e.id_empleado}>
                  <td>{index + 1}</td>
                  <td>{`${e.persona.primer_nombre} ${e.persona.primer_apellido}`}</td>
                  <td>{e.codigo_empleado}</td>
                  <td>{e.fecha_contratacion}</td>
                  <td>{e.estado?.nombre_estado}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/empleado/ver/${e.id_empleado}`)}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-warning" onClick={() => navigate(`/empleado/editar/${e.id_empleado}`)}>
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {empleados.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No hay empleados registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmpleadoIndex;
