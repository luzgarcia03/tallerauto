import React, { useEffect, useState } from 'react';
import api from '../../api/api'; 
import { useNavigate, useLocation } from 'react-router-dom';
import tienePermiso from '../../utils/tienePermiso';

const ClienteIndex = () => {
  const [clientes, setClientes] = useState([]);
  const [modal, setModal] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔁 Obtener clientes al cargar
  useEffect(() => {
    api.get('/clientes') 
      .then(response => {
        console.log("🟢 Clientes recibidos:", response.data);
        setClientes(response.data);
      })
      .catch(error => {
        console.error('🔴 Error al obtener clientes:', error);
      });
  }, []);

  // ✅ Mostrar mensaje si viene desde navegación
  useEffect(() => {
    if (location.state?.mensaje) {
      setMensaje({
        texto: location.state.mensaje,
        tipo: location.state.tipo || 'success'
      });
      window.history.replaceState({}, document.title);
      setTimeout(() => setMensaje(null), 5000);
    }
  }, [location.state]);

  // 🔍 Diagnóstico de permisos
  console.log("🎯 Permisos en localStorage:", localStorage.getItem('permisos'));
  console.log("🔒 Permiso cliente.crear:", tienePermiso('cliente.crear'));

  const verDetalle = (id) => navigate(`/cliente/ver/${id}`);
  const crearCliente = () => navigate('/cliente/crear');

  const confirmarEliminacion = (cliente) => {
    setSeleccionado(cliente);
    setModal(true);
  };

  const cerrarModal = () => {
    setSeleccionado(null);
    setModal(false);
  };

  const eliminar = async () => {
    try {
      await api.delete(`/clientes/${seleccionado.id_cliente}`);
      setClientes(clientes.filter(c => c.id_cliente !== seleccionado.id_cliente));
      cerrarModal();
      alert('Cliente eliminado con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar cliente');
    }
  };

  const renderEstado = (estado) => {
    if (!estado) return <span className="badge badge-secondary">Desconocido</span>;
    switch (estado.toLowerCase()) {
      case 'activo':
        return <span className="badge badge-success">{estado}</span>;
      case 'inactivo':
        return <span className="badge badge-secondary">{estado}</span>;
      default:
        return <span className="badge badge-danger">{estado}</span>;
    }
  };

  return (
    <div className="container mt-4">
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} role="alert">
          <strong><i className="fas fa-check-circle me-2"></i></strong> {mensaje.texto}
          <button type="button" className="btn-close" onClick={() => setMensaje(null)}></button>
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0"><i className="fas fa-users me-2"></i>Listado de Clientes</h3>
        {tienePermiso('cliente.crear') && (
          <button className="btn btn-success" onClick={crearCliente}>
            <i className="fas fa-plus me-1"></i> Crear Cliente
          </button>
        )}
      </div>

      <div className="card shadow rounded">
        <div className="card-body p-0">
          <table className="table table-sm table-hover table-striped mb-0">
            <thead className="thead-dark">
              <tr>
                <th style={{ width: '40px' }}>#</th>
                <th>Nombre Completo</th>
                <th>Email</th>
                <th style={{ width: '120px' }}>Estado</th>
                <th style={{ width: '180px' }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente, index) => (
                <tr key={cliente.id_cliente}>
                  <td>{index + 1}</td>
                  <td>
                    {cliente.persona.primer_nombre} {cliente.persona.segundo_nombre}{" "}
                    {cliente.persona.primer_apellido} {cliente.persona.segundo_apellido}
                  </td>
                  <td>{cliente.persona.email}</td>
                  <td>{renderEstado(cliente.persona.estado?.nombre_estado)}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-1 mb-1" onClick={() => verDetalle(cliente.id_cliente)}>
                      <i className="fas fa-eye me-1"></i> Ver
                    </button>
                    <button className="btn btn-sm btn-warning me-1 mb-1" onClick={() => navigate(`/cliente/editar/${cliente.id_cliente}`)}>
                      <i className="fas fa-edit me-1"></i> Editar
                    </button>
                    <button className="btn btn-sm btn-danger mb-1" onClick={() => confirmarEliminacion(cliente)}>
                      <i className="fas fa-trash-alt"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {clientes.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No hay clientes registrados</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">¿Eliminar Cliente?</h5>
                <button className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                ¿Está seguro que desea eliminar al cliente <strong>{seleccionado?.persona?.primer_nombre} {seleccionado?.persona?.primer_apellido}</strong>?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-danger" onClick={eliminar}>
                  <i className="fas fa-trash-alt me-1"></i>Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClienteIndex;
