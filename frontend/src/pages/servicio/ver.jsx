import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; // ✅ Cliente centralizado

const ServicioVer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [servicio, setServicio] = useState(null);

  useEffect(() => {
    api.get(`/servicios/${id}`)
      .then(res => setServicio(res.data))
      .catch(err => {
        console.error('Error al cargar servicio:', err);
        alert('Error al cargar detalle del servicio');
        navigate('/servicios');
      });
  }, [id, navigate]);

  if (!servicio) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-eye me-2"></i>Detalle del Servicio</h4>
          <button onClick={() => navigate('/servicios')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <p><strong>Nombre del Servicio:</strong> {servicio.nombre_servicio}</p>
          <p><strong>Descripción:</strong> {servicio.descripcion}</p>
          <p><strong>Duración Estimada:</strong> {servicio.duracion_estimada}</p>
          <p><strong>Costo Estimado:</strong> Q {servicio.costo_estimado ? Number(servicio.costo_estimado).toFixed(2) : '0.00'}</p>
          <p><strong>Estado:</strong> {servicio.estado?.nombre_estado}</p>
        </div>
      </div>
    </div>
  );
};

export default ServicioVer;
