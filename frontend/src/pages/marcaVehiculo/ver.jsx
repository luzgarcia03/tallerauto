import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const MarcaVehiculoVer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [marca, setMarca] = useState(null);

  useEffect(() => {
    api.get(`/marcas-vehiculo/${id}`) 
      .then(res => setMarca(res.data))
      .catch(() => {
        alert('No se pudo cargar la marca');
        navigate('/marca-vehiculo');
      });
  }, [id, navigate]);

  if (!marca) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-eye me-2"></i>Detalle de Marca</h4>
          <button onClick={() => navigate('/marca-vehiculo')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <p><strong>Nombre:</strong> {marca.nombre_marca}</p>
          <p><strong>Descripción:</strong> {marca.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default MarcaVehiculoVer;
