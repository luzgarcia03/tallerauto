import React, { useEffect, useState } from 'react';
import api from '../../api/api'; 
import { useNavigate } from 'react-router-dom';

const EstadoIndex = () => {
  const [estados, setEstados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/estados')
      .then(res => setEstados(res.data))
      .catch(err => console.error('Error al obtener estados:', err));
  }, []);

  const confirmarEliminacion = (estado) => {
    setEstadoSeleccionado(estado);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setEstadoSeleccionado(null);
    setMostrarModal(false);
  };

  const eliminarEstado = async () => {
    try {
      await api.delete(`/estados/${estadoSeleccionado.id_estado}`);
      setEstados(estados.filter(e => e.id_estado !== estadoSeleccionado.id_estado));
      cerrarModal();
      alert("Estado eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar estado:", error);
      alert("Ocurrió un error al eliminar el estado.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-flag me-2"></i>Estados</h4>
          <button className="btn btn-light" onClick={() => navigate('/estado/crear')}>
            <i className="fas fa-plus me-1"></i> Crear Estado
          </button>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estados.length > 0 ? estados.map((estado, index) => (
                <tr key={estado.id_estado}>
                  <td>{index + 1}</td>
                  <td>{estado.nombre_estado}</td>
                  <td>{estado.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/estado/editar/${estado.id_estado}`)}
                    >
                      <i className="fas fa-edit me-1"></i>Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => confirmarEliminacion(estado)}
                    >
                      <i className="fas fa-trash-alt me-1"></i>Eliminar
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" className="text-center">No hay estados registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔻 Modal de Confirmación de Eliminación */}
      {mostrarModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">¿Confirmar Eliminación?</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás segura que deseas eliminar el estado <strong>{estadoSeleccionado?.nombre_estado}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-danger" onClick={eliminarEstado}>
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

export default EstadoIndex;
