import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const ProveedorVer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proveedor, setProveedor] = useState(null);

  useEffect(() => {
    api.get(`/proveedores/${id}`)
      .then(res => setProveedor(res.data))
      .catch(() => navigate('/proveedor'));
  }, [id, navigate]);

  if (!proveedor) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-eye me-2"></i>Detalle del Proveedor</h4>
          <button className="btn btn-outline-light" onClick={() => navigate('/proveedor')}>
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <p><strong>Nombre:</strong> {proveedor.nombre_proveedor}</p>
          <p><strong>Contacto:</strong> {proveedor.contacto_principal}</p>
          <p><strong>Teléfono:</strong> {proveedor.telefono}</p>
          <p><strong>Email:</strong> {proveedor.email}</p>
          <p><strong>Dirección:</strong> {proveedor.direccion}</p>
          <p><strong>NIT:</strong> {proveedor.nit}</p>
          <p><strong>Estado:</strong> {proveedor.estado?.nombre_estado}</p>
        </div>
      </div>
    </div>
  );
};

export default ProveedorVer;
