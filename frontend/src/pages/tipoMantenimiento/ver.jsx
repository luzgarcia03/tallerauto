import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const TipoMantenimientoVer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tipo, setTipo] = useState(null);

  useEffect(() => {
    api.get(`/tipos-mantenimiento/${id}`) 
      .then(res => setTipo(res.data))
      .catch(() => {
        alert('No se pudo cargar el detalle');
        navigate('/tipo-mantenimiento');
      });
  }, [id, navigate]);

  if (!tipo) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-eye me-2"></i>Detalle del Tipo de Mantenimiento</h4>
          <button onClick={() => navigate('/tipo-mantenimiento')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <p><strong>Nombre:</strong> {tipo.nombre_tipo}</p>
          <p><strong>Descripción:</strong> {tipo.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default TipoMantenimientoVer;
