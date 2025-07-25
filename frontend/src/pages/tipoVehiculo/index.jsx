import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

const TipoVehiculoIndex = () => {
  const [tipos, setTipos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/tipos-vehiculo')
      .then(res => setTipos(res.data))
      .catch(err => console.error('Error al cargar tipos de vehículo:', err));
  }, []);

  const confirmarEliminacion = (tipo) => {
    setTipoSeleccionado(tipo);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setTipoSeleccionado(null);
    setMostrarModal(false);
  };

  const eliminarTipo = async () => {
    try {
      await api.delete(`/tipos-vehiculo/${tipoSeleccionado.id_tipo_vehiculo}`);
      setTipos(tipos.filter(t => t.id_tipo_vehiculo !== tipoSeleccionado.id_tipo_vehiculo));
      cerrarModal();
      alert("Tipo de vehículo eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar tipo de vehículo:", error);
      alert("Ocurrió un error al eliminar el tipo de vehículo.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-car-side me-2"></i>Tipos de Vehículo</h4>
          <button className="btn btn-light" onClick={() => navigate('/tipo-vehiculo/crear')}>
            <i className="fas fa-plus me-1"></i> Crear Tipo
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
              {tipos.length > 0 ? tipos.map((tipo, index) => (
                <tr key={tipo.id_tipo_vehiculo}>
                  <td>{index + 1}</td>
                  <td>{tipo.nombre_tipo}</td>
                  <td>{tipo.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => navigate(`/tipo-vehiculo/ver/${tipo.id_tipo_vehiculo}`)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/tipo-vehiculo/editar/${tipo.id_tipo_vehiculo}`)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => confirmarEliminacion(tipo)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="text-center">No hay tipos registrados.</td></tr>
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
                <p>¿Estás segura que deseas eliminar el tipo de vehículo <strong>{tipoSeleccionado?.nombre_tipo}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-danger" onClick={eliminarTipo}>
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

export default TipoVehiculoIndex;
