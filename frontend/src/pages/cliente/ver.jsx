import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const ClienteVer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    api.get(`/clientes/${id}`)
      .then(res => {
        setCliente(res.data); 
      })
      .catch(err => {
        console.error('Error al cargar cliente:', err);
        alert('No se pudo obtener el cliente');
        navigate('/cliente');
      });
  }, [id, navigate]);
  
  if (!cliente) {
    return <div className="container mt-4">Cargando...</div>;
  }

  const { persona } = cliente;

  return (
    <div className="container mt-4">
      <div className="card shadow rounded-3">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-user me-2"></i>Detalle del Cliente</h4>
          <button onClick={() => navigate('/cliente')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>

        <div className="card-body">
          {/* DATOS PERSONALES */}
          <h5 className="text-info mb-3"><i className="fas fa-id-card me-2"></i>Datos Personales</h5>
          <div className="row g-3">
            <div className="col-md-6">
              <div className="bg-light p-3 rounded border"><strong>Nombre:</strong> {persona.primer_nombre} {persona.segundo_nombre}</div>
            </div>
            <div className="col-md-6">
              <div className="bg-light p-3 rounded border"><strong>Apellidos:</strong> {persona.primer_apellido} {persona.segundo_apellido}</div>
            </div>
            <div className="col-md-4">
              <div className="bg-light p-3 rounded border"><strong>Fecha de Nacimiento:</strong> {persona.fecha_nacimiento}</div>
            </div>
            <div className="col-md-4">
              <div className="bg-light p-3 rounded border"><strong>Teléfono:</strong> {persona.telefono}</div>
            </div>
            <div className="col-md-4">
              <div className="bg-light p-3 rounded border"><strong>Email:</strong> {persona.email}</div>
            </div>
            <div className="col-md-6">
              <div className="bg-light p-3 rounded border"><strong>Dirección:</strong> {persona.direccion}</div>
            </div>
            <div className="col-md-3">
              <div className="bg-light p-3 rounded border"><strong>Municipio:</strong> {persona.municipio}</div>
            </div>
            <div className="col-md-3">
              <div className="bg-light p-3 rounded border"><strong>Departamento:</strong> {persona.departamento}</div>
            </div>
            <div className="col-md-3">
              <div className="bg-light p-3 rounded border"><strong>Zona:</strong> {persona.zona}</div>
            </div>
            <div className="col-md-5">
              <div className="bg-light p-3 rounded border"><strong>Fecha Registro:</strong> {new Date(persona.fecha_registro).toLocaleDateString()}</div>
            </div>
            <div className="col-md-4">
              <div className="bg-light p-3 rounded border">
                <strong>Estado:</strong>{' '}
                <span className={`badge ${persona.estado?.nombre_estado === 'Activo' ? 'bg-success' : 'bg-danger'}`}>
                  {persona.estado?.nombre_estado}
                </span>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          {/* DATOS CLIENTE */}
          <h5 className="text-info mb-3"><i className="fas fa-address-card me-2"></i>Datos del Cliente</h5>
          <div className="row g-3">
            <div className="col-md-4">
              <div className="bg-light p-3 rounded border"><strong>NIT:</strong> {cliente.nit}</div>
            </div>
            <div className="col-md-4">
              <div className="bg-light p-3 rounded border"><strong>DPI:</strong> {cliente.dpi}</div>
            </div>
            <div className="col-md-4">
              <div className="bg-light p-3 rounded border"><strong>Puntos de Fidelidad:</strong> {cliente.puntos_fidelidad}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteVer;
