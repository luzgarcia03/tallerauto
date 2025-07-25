import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; // ✅ Cliente centralizado

const ProveedorIndex = () => {
  const [proveedores, setProveedores] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    api.get('/proveedores')
      .then(res => setProveedores(res.data))
      .catch(err => console.error('Error al obtener proveedores:', err));
  }, []);

  const confirmarEliminacion = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setProveedorSeleccionado(null);
    setMostrarModal(false);
  };

  const eliminarProveedor = async () => {
    try {
      await api.delete(`/proveedores/${proveedorSeleccionado.id_proveedor}`);
      setProveedores(proveedores.filter(p => p.id_proveedor !== proveedorSeleccionado.id_proveedor));
      cerrarModal();
      alert('Proveedor eliminado con éxito');
    } catch (err) {
      console.error('Error al eliminar proveedor:', err);
      alert('Ocurrió un error al eliminar el proveedor');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-truck me-2"></i>Proveedores</h4>
          <button className="btn btn-light" onClick={() => navigate('/proveedor/crear')}>
            <i className="fas fa-plus me-1"></i> Crear Proveedor
          </button>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.length > 0 ? proveedores.map((prov, index) => (
                <tr key={prov.id_proveedor}>
                  <td>{index + 1}</td>
                  <td>{prov.nombre_proveedor}</td>
                  <td>{prov.contacto_principal}</td>
                  <td>{prov.telefono}</td>
                  <td>{prov.estado?.nombre_estado}</td>
                  <td>
                    <button className="btn btn-sm btn-info me-2" onClick={() => navigate(`/proveedor/ver/${prov.id_proveedor}`)}>
                      <i className="fas fa-eye"></i>
                    </button>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => navigate(`/proveedor/editar/${prov.id_proveedor}`)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => confirmarEliminacion(prov)}>
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center">No hay proveedores registrados.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔻 Modal de Confirmación */}
      {mostrarModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">¿Eliminar Proveedor?</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <p>¿Seguro que deseas eliminar al proveedor <strong>{proveedorSeleccionado?.nombre_proveedor}</strong>?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-danger" onClick={eliminarProveedor}>
                  <i className="fas fa-trash-alt me-1"></i> Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProveedorIndex;
