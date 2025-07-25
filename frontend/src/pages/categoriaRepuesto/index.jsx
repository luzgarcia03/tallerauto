import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

const CategoriaRepuestoIndex = () => {
  const [categorias, setCategorias] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categorias-repuesto')
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Error al obtener categorías:', err));
  }, []);

  const confirmarEliminacion = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setCategoriaSeleccionada(null);
  };

  const eliminarCategoria = async () => {
    try {
      await api.delete(`/categorias-repuesto/${categoriaSeleccionada.id_categoria_repuesto}`);
      setCategorias(categorias.filter(c => c.id_categoria_repuesto !== categoriaSeleccionada.id_categoria_repuesto));
      cerrarModal();
    } catch (err) {
      console.error(err);
        }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-tags me-2"></i>Categorías de Repuesto</h4>
          <button className="btn btn-light" onClick={() => navigate('/categoria-repuesto/crear')}>
            <i className="fas fa-plus me-1"></i> Crear Categoría
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
              {categorias.map((cat, index) => (
                <tr key={cat.id_categoria_repuesto}>
                  <td>{index + 1}</td>
                  <td>{cat.nombre_categoria}</td>
                  <td>{cat.descripcion}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/categoria-repuesto/ver/${cat.id_categoria_repuesto}`)}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/categoria-repuesto/editar/${cat.id_categoria_repuesto}`)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => confirmarEliminacion(cat)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {categorias.length === 0 && (
                <tr><td colSpan="4" className="text-center">No hay categorías registradas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalVisible && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">¿Eliminar Categoría?</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <p>¿Estás segura que deseas eliminar la categoría <strong>{categoriaSeleccionada?.nombre_categoria}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-danger" onClick={eliminarCategoria}>
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

export default CategoriaRepuestoIndex;
