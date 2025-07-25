import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

const EditarSolicitudHerramienta = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    empleado_id: "",
    fecha_solicitud: "",
    fecha_requerida: "",
    observaciones: "",
    id_estado: "",
  });

  const [empleados, setEmpleados] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    // Cargar solicitud
    api.get(`/solicitud-herramienta/${id}`)
      .then((res) => {
        const data = res.data;
        setForm({
          ...data,
          fecha_solicitud: data.fecha_solicitud?.split("T")[0] || "",
          fecha_requerida: data.fecha_requerida?.split("T")[0] || "",
        });
      })
      .catch((err) => {
        console.error("Error al cargar solicitud:", err);
        alert("Error al obtener los datos");
      });

    // Cargar empleados
    api.get("/empleados")
      .then(res => setEmpleados(res.data))
      .catch(err => console.error("Error al cargar empleados", err));

    // Cargar estados
    api.get("/estados")
      .then(res => setEstados(res.data))
      .catch(err => console.error("Error al cargar estados", err));
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.put(`/solicitud-herramienta/${id}`, form)
      .then(() => {
        alert("✅ Solicitud actualizada correctamente");
        navigate("/solicitud-herramienta");
      })
      .catch((err) => {
        console.error("Error al actualizar la solicitud:", err);
        alert("❌ Error al guardar los cambios");
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-edit me-2"></i>Editar Solicitud de Herramienta</h4>
          <button onClick={() => navigate("/solicitud-herramienta")} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Empleado</label>
              <select
                name="empleado_id"
                className="form-control"
                value={form.empleado_id}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un empleado</option>
                {empleados.map(emp => (
                  <option key={emp.id_empleado} value={emp.id_empleado}>
                    {emp.codigo_empleado} - {emp.persona?.primer_nombre} {emp.persona?.primer_apellido}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha de Solicitud</label>
              <input
                type="date"
                name="fecha_solicitud"
                className="form-control"
                value={form.fecha_solicitud}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Fecha Requerida</label>
              <input
                type="date"
                name="fecha_requerida"
                className="form-control"
                value={form.fecha_requerida}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Observaciones</label>
              <textarea
                name="observaciones"
                className="form-control"
                value={form.observaciones}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Estado</label>
              <select
                name="id_estado"
                className="form-control"
                value={form.id_estado}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un estado</option>
                {estados.map(est => (
                  <option key={est.id_estado} value={est.id_estado}>
                    {est.nombre_estado}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                <i className="fas fa-save me-1"></i>Actualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarSolicitudHerramienta;
