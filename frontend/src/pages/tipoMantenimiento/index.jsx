import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; // ✅ Cliente centralizado

const TipoMantenimientoIndex = () => {
  const [tipos, setTipos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/tipos-mantenimiento')
      .then(res => setTipos(res.data))
      .catch(err => console.error('Error al cargar tipos de mantenimiento:', err));
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
      await api.delete(`/tipos-mantenimiento/${tipoSeleccionado.id_tipo_mantenimiento}`);
      setTipos(tipos.filter(t => t.id_tipo_mantenimiento !== tipoSeleccionado.id_tipo_mantenimiento));
      cerrarModal();
      alert('Tipo de mantenimiento eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar tipo de mantenimiento:', error);
      alert('Ocurrió un error al eliminar el tipo de mantenimiento.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-tools me-2"></i>Tipos de Mantenimiento</h4>
          <button className="btn btn-light" onClick={() => navigate('/tipo-mantenimiento/crear')}>
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
                <tr key={tipo.id_tipo_mantenimiento}>
                  <td>{index + 1}</td>
                  <td>{tipo.nombre_tipo}</td>
                  <td>{tipo.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => navigate(`/tipo-mantenimiento/ver/${tipo.id_tipo_mantenimiento}`)}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/tipo-mantenimiento/editar/${tipo.id_tipo_mantenimiento}`)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => confirmarEliminacion(tipo)}>
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
                <p>¿Estás segura que deseas eliminar el tipo <strong>{tipoSeleccionado?.nombre_tipo}</strong>?</p>
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

export default TipoMantenimientoIndex;
