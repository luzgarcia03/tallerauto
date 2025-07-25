import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

const CrearServicio = () => {
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [form, setForm] = useState({
    nombre_servicio: '',
    descripcion: '',
    duracion_estimada: '',
    costo_estimado: '',
    id_estado: ''
  });

  useEffect(() => {
    api.get('/estados') 
      .then((res) => setEstados(res.data))
      .catch((err) => console.error("Error al obtener estados", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post('/servicios', form) // ✅ Petición centralizada
      .then(() => {
        alert("Servicio creado con éxito");
        navigate("/servicios");
      })
      .catch(() => alert("Error al crear servicio"));
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-concierge-bell me-2"></i>Crear Servicio</h4>
          <button onClick={() => navigate("/servicios")} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i>Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <label>Nombre del Servicio</label>
                <input
                  type="text"
                  name="nombre_servicio"
                  className="form-control"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label>Duración Estimada</label>
                <input
                  type="text"
                  name="duracion_estimada"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label>Costo Estimado (Q)</label>
                <input
                  type="number"
                  step="0.01"
                  name="costo_estimado"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label>Estado</label>
                <select
                  name="id_estado"
                  className="form-control"
                  required
                  onChange={handleChange}
                  value={form.id_estado}
                >
                  <option value="">Seleccione</option>
                  {estados.map((estado) => (
                    <option key={estado.id_estado} value={estado.id_estado}>
                      {estado.nombre_estado}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-12 mt-3">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  className="form-control"
                  rows="3"
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <div className="text-end mt-4">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-save me-1"></i>Guardar Servicio
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearServicio;
