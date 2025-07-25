import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api";

const SolicitudHerramientaIndex = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [seleccionado, setSeleccionado] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/solicitud-herramienta')
      .then(async (res) => {
        const data = res.data;

        // Cargar nombres de empleados y estados
        const solicitudesConDatos = await Promise.all(data.map(async (s) => {
          let empleadoNombre = 'Desconocido';
          let estadoNombre = 'Desconocido';

          try {
            const emp = await api.get(`/empleados/${s.empleado_id}`);
            empleadoNombre = `${emp.data.codigo_empleado} - ${emp.data.persona?.primer_nombre} ${emp.data.persona?.primer_apellido}`;
          } catch {}

          try {
            const est = await api.get(`/estados/${s.id_estado}`);
            estadoNombre = est.data.nombre_estado;
          } catch {}

          return { ...s, empleadoNombre, estadoNombre };
        }));

        setSolicitudes(solicitudesConDatos);
      })
      .catch((err) => console.error("Error al obtener solicitudes", err));
  }, []);

  const confirmarEliminacion = (solicitud) => {
    setSeleccionado(solicitud);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setSeleccionado(null);
    setMostrarModal(false);
  };

  const eliminarSolicitud = async () => {
    try {
      await api.delete(`/solicitud-herramienta/${seleccionado.id_solicitud}`);
      setSolicitudes(solicitudes.filter(s => s.id_solicitud !== seleccionado.id_solicitud));
      cerrarModal();
      alert('Solicitud eliminada correctamente.');
    } catch (error) {
      console.error('Error al eliminar solicitud:', error);
      alert('Error al eliminar la solicitud.');
    }
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-list-alt me-2"></i>Gestión de Solicitudes de Herramienta</h4>
          <Link to="/solicitud-herramienta/crear" className="btn btn-light">
            <i className="fas fa-plus me-1"></i> Nueva Solicitud
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Empleado</th>
                <th>Fecha Solicitud</th>
                <th>Fecha Requerida</th>
                <th>Observaciones</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.length > 0 ? solicitudes.map((s) => (
                <tr key={s.id_solicitud}>
                  <td>{s.empleadoNombre}</td>
                  <td>{new Date(s.fecha_solicitud).toLocaleDateString("es-GT")}</td>
                  <td>{new Date(s.fecha_requerida).toLocaleDateString("es-GT")}</td>
                  <td>{s.observaciones}</td>
                  <td>{s.estadoNombre}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-1"
                      onClick={() => navigate(`/solicitud-herramienta/ver/${s.id_solicitud}`)}
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-1"
                      onClick={() => navigate(`/solicitud-herramienta/editar/${s.id_solicitud}`)}
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => confirmarEliminacion(s)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center">No hay solicitudes registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {mostrarModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">¿Confirmar eliminación?</h5>
                <button type="button" className="btn-close" onClick={cerrarModal}></button>
              </div>
              <div className="modal-body">
                <p>¿Deseas eliminar esta solicitud?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={cerrarModal}>Cancelar</button>
                <button className="btn btn-danger" onClick={eliminarSolicitud}>
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

export default SolicitudHerramientaIndex;
