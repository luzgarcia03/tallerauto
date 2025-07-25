import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const CategoriaRepuestoVer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);

  useEffect(() => {
    api.get(`/categorias-repuesto/${id}`)
      .then(res => setCategoria(res.data))
      .catch(err => {
        console.error(err);
        alert("No se pudo obtener la categoría");
        navigate('/categoria-repuesto');
      });
  }, [id, navigate]);

  if (!categoria) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-tag me-2"></i>Detalle de Categoría</h4>
          <button onClick={() => navigate('/categoria-repuesto')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <p><strong>Nombre:</strong> {categoria.nombre_categoria}</p>
          <p><strong>Descripción:</strong> {categoria.descripcion}</p>
        </div>
      </div>
    </div>
  );
};

export default CategoriaRepuestoVer;
