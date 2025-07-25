import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const RepuestoIndex = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [modal, setModal] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/repuestos')
      .then(res => setRepuestos(res.data))
      .catch(err => console.error('Error al cargar repuestos:', err));
  }, []);

  const eliminar = async () => {
    try {
      await api.delete(`/repuestos/${seleccionado.id_repuesto}`);
      setRepuestos(repuestos.filter(r => r.id_repuesto !== seleccionado.id_repuesto));
      cerrarModal();
      alert('Repuesto eliminado con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar repuesto');
    }
  };

  const confirmar = (repuesto) => {
    setSeleccionado(repuesto);
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
          <h4 className="mb-0"><i className="fas fa-cogs me-2"></i>Repuestos</h4>
          <button className="btn btn-light" onClick={() => navigate('/repuesto/crear')}>
            <i className="fas fa-plus me-1"></i> Nuevo Repuesto
          </button>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Código</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio Venta</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {repuestos.map((r, i) => (
                <tr key={r.id_repuesto}>
                  <td>{i + 1}</td>
                  <td>{r.codigo_repuesto}</td>
                  <td>{r.nombre_repuesto}</td>
                  <td>{r.marca}</td>
                  <td>Q {isNaN(Number(r.precio_venta)) ? '0.00' : Number(r.precio_venta).toFixed(2)}</td>
                  <td>{r.stock_minimo}</td>
                  <td>{r.estado?.nombre_estado}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-1" onClick={() => navigate(`/repuesto/ver/${r.id_repuesto}`)}><i className="fas fa-eye"></i></button>
                    <button className="btn btn-sm btn-warning me-1" onClick={() => navigate(`/repuesto/editar/${r.id_repuesto}`)}><i className="fas fa-edit"></i></button>
                    <button className="btn btn-sm btn-danger" onClick={() => confirmar(r)}><i className="fas fa-trash-alt"></i></button>
                  </td>
                </tr>
              ))}
              {repuestos.length === 0 && (
                <tr><td colSpan="8" className="text-center">No hay repuestos</td></tr>
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
                <h5 className="modal-title">¿Eliminar Repuesto?</h5>
                <button className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                ¿Está segura que desea eliminar <strong>{seleccionado?.nombre_repuesto}</strong>?
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

export default RepuestoIndex;
