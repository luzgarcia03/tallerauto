import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const EmpleadoVer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);

  useEffect(() => {
    api.get(`/empleados/${id}`)
      .then(res => setEmpleado(res.data))
      .catch(() => {
        alert('Error al cargar el detalle del empleado');
        navigate('/empleado');
      });
  }, [id, navigate]);

  if (!empleado) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-eye me-2"></i>Detalle del Empleado</h4>
          <button onClick={() => navigate('/empleado')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <p><strong>Nombre:</strong> {empleado.persona.primer_nombre} {empleado.persona.primer_apellido}</p>
          <p><strong>Código Empleado:</strong> {empleado.codigo_empleado}</p>
          <p><strong>Teléfono:</strong> {empleado.persona.telefono}</p>
          <p><strong>Email:</strong> {empleado.persona.email}</p>
          <p><strong>Fecha Contratación:</strong> {empleado.fecha_contratacion}</p>
          <p><strong>Estado:</strong> {empleado.estado?.nombre_estado}</p>
        </div>
      </div>
    </div>
  );
};

export default EmpleadoVer;
