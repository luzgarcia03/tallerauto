import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api';

const RepuestoVer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [repuesto, setRepuesto] = useState(null);

  useEffect(() => {
    api.get(`/repuestos/${id}`)
      .then(res => setRepuesto(res.data))
      .catch(err => {
        console.error('Error al cargar repuesto:', err);
        alert('Error al cargar detalle del repuesto');
        navigate('/repuesto');
      });
  }, [id, navigate]);

  if (!repuesto) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-eye me-2"></i>Detalle del Repuesto</h4>
          <button onClick={() => navigate('/repuesto')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <p><strong>Nombre:</strong> {repuesto.nombre_repuesto}</p>
          <p><strong>Código:</strong> {repuesto.codigo_repuesto}</p>
          <p><strong>Marca:</strong> {repuesto.marca}</p>
          <p><strong>Modelo Compatible:</strong> {repuesto.modelo_compatible}</p>
          <p><strong>Descripción:</strong> {repuesto.descripcion}</p>
          <p><strong>Precio Compra:</strong> Q {repuesto.precio_compra ? Number(repuesto.precio_compra).toFixed(2) : '0.00'}</p>
          <p><strong>Precio Venta:</strong> Q {repuesto.precio_venta ? Number(repuesto.precio_venta).toFixed(2) : '0.00'}</p>
          <p><strong>Stock Mínimo:</strong> {repuesto.stock_minimo}</p>
          <p><strong>Categoría:</strong> {repuesto.categoria?.nombre_categoria}</p>
          <p><strong>Estado:</strong> {repuesto.estado?.nombre_estado}</p>
        </div>
      </div>
    </div>
  );
};

export default RepuestoVer;
