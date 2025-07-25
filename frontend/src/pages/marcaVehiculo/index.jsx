import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; // ✅ Cliente Axios centralizado

const MarcaVehiculoIndex = () => {
  const [marcas, setMarcas] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [marcaSeleccionada, setMarcaSeleccionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/marcas-vehiculo')
      .then(res => setMarcas(res.data))
      .catch(err => console.error('Error al cargar marcas:', err));
  }, []);

  const confirmarEliminacion = (marca) => {
    setMarcaSeleccionada(marca);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMarcaSeleccionada(null);
    setMostrarModal(false);
  };

  const eliminarMarca = async () => {
    try {
      await api.delete(`/marcas-vehiculo/${marcaSeleccionada.id_marca}`);
      setMarcas(marcas.filter(m => m.id_marca !== marcaSeleccionada.id_marca));
      cerrarModal();
      alert("Marca eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar marca:", error);
      alert("Ocurrió un error al eliminar la marca.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-car me-2"></i>Marcas de Vehículo</h4>
          <button className="btn btn-light" onClick={() => navigate('/marca-vehiculo/crear')}>
            <i className="fas fa-plus me-1"></i> Crear Marca
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
              {marcas.length > 0 ? marcas.map((marca, index) => (
                <tr key={marca.id_marca}>
                  <td>{index + 1}</td>
                  <td>{marca.nombre_marca}</td>
                  <td>{marca.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => navigate(`/marca-vehiculo/ver/${marca.id_marca}`)}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => navigate(`/marca-vehiculo/editar/${marca.id_marca}`)}>
                      <i className="fas fa-edit"></i> Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => confirmarEliminacion(marca)}>
                      <i className="fas fa-trash-alt"></i> Eliminar
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="text-center">No hay marcas registradas.</td></tr>
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
                <p>¿Estás segura que deseas eliminar la marca <strong>{marcaSeleccionada?.nombre_marca}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-danger" onClick={eliminarMarca}>
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

export default MarcaVehiculoIndex;
