import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

const EditarServicio = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    api.get(`/servicios/${id}`)
      .then(res => setForm(res.data))
      .catch(() => {
        alert("Error al cargar el servicio");
        navigate("/servicios");
      });

    api.get("/estados")
      .then(res => setEstados(res.data))
      .catch(err => console.error("Error al cargar estados", err));
  }, [id, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.put(`/servicios/${id}`, form)
      .then(() => {
        alert("Servicio actualizado con éxito");
        navigate("/servicios");
      })
      .catch(() => alert("Error al actualizar el servicio"));
  };

  if (!form) return <div className="container mt-4">Cargando...</div>;

  return (
    <div className="content-wrapper">
      <div className="container-fluid mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card">
              <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
                <h4 className="mb-0"><i className="fas fa-edit me-2"></i>Editar Servicio</h4>
                <button onClick={() => navigate("/servicios")} className="btn btn-outline-light">
                  <i className="fas fa-arrow-left me-1"></i>Volver
                </button>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label>Nombre del Servicio</label>
                    <input
                      type="text"
                      name="nombre_servicio"
                      className="form-control"
                      value={form.nombre_servicio}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label>Descripción</label>
                    <textarea
                      name="descripcion"
                      className="form-control"
                      value={form.descripcion}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label>Duración Estimada</label>
                    <input
                      type="text"
                      name="duracion_estimada"
                      className="form-control"
                      value={form.duracion_estimada}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Costo Estimado (Q)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="costo_estimado"
                      className="form-control"
                      value={form.costo_estimado}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label>Estado</label>
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
        </div>
      </div>
    </div>
  );
};

export default EditarServicio;
