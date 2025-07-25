import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const EstadoGeneralIndex = () => {
  const [estadosGeneral, setEstadosGeneral] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/estado-general') 
      .then(res => setEstadosGeneral(res.data))
      .catch(err => console.error('Error al obtener estados generales:', err));
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
      await api.delete(`/estado-general/${estadoSeleccionado.id_estado_general}`);
      setEstadosGeneral(estadosGeneral.filter(e => e.id_estado_general !== estadoSeleccionado.id_estado_general));
      cerrarModal();
      alert("Estado general eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar estado general:", error);
      alert("Ocurrió un error al eliminar el estado general.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-chart-pie me-2"></i>Estados Generales</h4>
          <button className="btn btn-light" onClick={() => navigate('/estado-general/crear')}>
            <i className="fas fa-plus me-1"></i> Crear Estado
          </button>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estadosGeneral.length > 0 ? estadosGeneral.map((estado, index) => (
                <tr key={estado.id_estado_general}>
                  <td>{index + 1}</td>
                  <td>{estado.nombre_estado}</td>
                  <td>{estado.descripcion_estado}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-1"
                      onClick={() => navigate(`/estado-general/ver/${estado.id_estado_general}`)}
                    >
                      <i className="fas fa-eye me-1"></i>Ver
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => navigate(`/estado-general/editar/${estado.id_estado_general}`)}
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
                  <td colSpan="4" className="text-center">No hay estados generales registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de confirmación */}
      {mostrarModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">¿Confirmar Eliminación?</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás segura que deseas eliminar el estado general <strong>{estadoSeleccionado?.nombre_estado}</strong>?</p>
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

export default EstadoGeneralIndex;
