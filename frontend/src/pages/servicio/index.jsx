import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; // ✅ Usamos cliente centralizado

const ServiciosIndex = () => {
  const [servicios, setServicios] = useState([]);
  const [modal, setModal] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/servicios')
      .then(res => setServicios(res.data))
      .catch(err => console.error('Error al cargar servicios:', err));
  }, []);

  const eliminar = async () => {
    try {
      await api.delete(`/servicios/${seleccionado.id_servicio}`);
      setServicios(servicios.filter(s => s.id_servicio !== seleccionado.id_servicio));
      cerrarModal();
      alert('Servicio eliminado con éxito');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar servicio');
    }
  };

  const confirmar = (servicio) => {
    setSeleccionado(servicio);
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
          <h4 className="mb-0"><i className="fas fa-concierge-bell me-2"></i>Servicios</h4>
          <button className="btn btn-light" onClick={() => navigate('/servicios/crear')}>
            <i className="fas fa-plus me-1"></i> Nuevo Servicio
          </button>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Duración</th>
                <th>Costo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {servicios.map((s, i) => (
                <tr key={s.id_servicio}>
                  <td>{i + 1}</td>
                  <td>{s.nombre_servicio}</td>
                  <td>{s.descripcion}</td>
                  <td>{s.duracion_estimada}</td>
                  <td>Q {isNaN(Number(s.costo_estimado)) ? '0.00' : Number(s.costo_estimado).toFixed(2)}</td>
                  <td>{s.estado?.nombre_estado}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-1" onClick={() => navigate(`/servicios/ver/${s.id_servicio}`)}><i className="fas fa-eye"></i></button>
                    <button className="btn btn-sm btn-warning me-1" onClick={() => navigate(`/servicios/editar/${s.id_servicio}`)}><i className="fas fa-edit"></i></button>
                    <button className="btn btn-sm btn-danger" onClick={() => confirmar(s)}><i className="fas fa-trash-alt"></i></button>
                  </td>
                </tr>
              ))}
              {servicios.length === 0 && (
                <tr><td colSpan="7" className="text-center">No hay servicios registrados</td></tr>
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
                <h5 className="modal-title">¿Eliminar Servicio?</h5>
                <button className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                ¿Está segura que desea eliminar el servicio <strong>{seleccionado?.nombre_servicio}</strong>?
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

export default ServiciosIndex;
