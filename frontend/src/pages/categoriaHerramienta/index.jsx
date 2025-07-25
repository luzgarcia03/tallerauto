import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api"; // ✅ Asegúrate de que la ruta sea correcta

const CategoriaHerramientaIndex = () => {
  const [categorias, setCategorias] = useState([]);
  const [modal, setModal] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/categorias-herramienta')
      .then(res => setCategorias(res.data))
      .catch(err => console.error('Error al obtener categorías:', err));
  }, []);

  const eliminar = async () => {
    try {
      await api.delete(`/categorias-herramienta/${seleccionado.id_categoria_herramienta}`);
      setCategorias(categorias.filter(c => c.id_categoria_herramienta !== seleccionado.id_categoria_herramienta));
      cerrarModal();
      alert('Categoría eliminada con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar categoría');
    }
  };

  const confirmar = (categoria) => {
    setSeleccionado(categoria);
    setModal(true);
  };

  const cerrarModal = () => {
    setSeleccionado(null);
    setModal(false);
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-tools me-2"></i>Categorías de Herramientas</h4>
          <button className="btn btn-light" onClick={() => navigate('/categorias-herramienta/crear')}>
            <i className="fas fa-plus me-1"></i> Nueva Categoría
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
              {categorias.map((c, i) => (
                <tr key={c.id_categoria_herramienta}>
                  <td>{i + 1}</td>
                  <td>{c.nombre_categoria}</td>
                  <td>{c.descripcion}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-1" onClick={() => navigate(`/categorias-herramienta/ver/${c.id_categoria_herramienta}`)}><i className="fas fa-eye"></i></button>
                    <button className="btn btn-sm btn-warning me-1" onClick={() => navigate(`/categorias-herramienta/editar/${c.id_categoria_herramienta}`)}><i className="fas fa-edit"></i></button>
                    <button className="btn btn-sm btn-danger" onClick={() => confirmar(c)}><i className="fas fa-trash-alt"></i></button>
                  </td>
                </tr>
              ))}
              {categorias.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center">No hay categorías registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de confirmación */}
      {modal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">¿Eliminar Categoría?</h5>
                <button className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                ¿Está seguro que desea eliminar la categoría <strong>{seleccionado?.nombre_categoria}</strong>?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-danger" onClick={eliminar}><i className="fas fa-trash-alt me-1"></i>Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriaHerramientaIndex;
