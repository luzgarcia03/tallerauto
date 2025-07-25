import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/api";

const VerSolicitudHerramienta = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [solicitud, setSolicitud] = useState(null);
  const [empleado, setEmpleado] = useState(null);
  const [estado, setEstado] = useState(null);

  useEffect(() => {
    api.get(`/solicitud-herramienta/${id}`)
      .then((res) => {
        setSolicitud(res.data);

        // Cargar empleado relacionado
        api.get(`/empleados/${res.data.empleado_id}`)
          .then(empRes => setEmpleado(empRes.data))
          .catch(() => console.warn("No se pudo obtener el empleado"));

        // Cargar estado relacionado
        api.get(`/estados/${res.data.id_estado}`)
          .then(estRes => setEstado(estRes.data))
          .catch(() => console.warn("No se pudo obtener el estado"));
      })
      .catch((err) => {
        console.error("Error al cargar solicitud:", err);
        alert("Error al cargar el detalle");
        navigate("/solicitud-herramienta");
      });
  }, [id, navigate]);

  if (!solicitud) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-eye me-2"></i>Detalle de Solicitud de Herramienta</h4>
          <button onClick={() => navigate("/solicitud-herramienta")} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <p><strong>ID Solicitud:</strong> {solicitud.id_solicitud}</p>
          <p><strong>Empleado:</strong> {empleado ? `${empleado.codigo_empleado} - ${empleado.persona?.primer_nombre} ${empleado.persona?.primer_apellido}` : "Cargando..."}</p>
          <p><strong>Fecha Solicitud:</strong> {new Date(solicitud.fecha_solicitud).toLocaleDateString("es-GT")}</p>
          <p><strong>Fecha Requerida:</strong> {new Date(solicitud.fecha_requerida).toLocaleDateString("es-GT")}</p>
          <p><strong>Observaciones:</strong> {solicitud.observaciones}</p>
          <p><strong>Estado:</strong> {estado ? estado.nombre_estado : "Cargando..."}</p>
        </div>
      </div>
    </div>
  );
};

export default VerSolicitudHerramienta;
