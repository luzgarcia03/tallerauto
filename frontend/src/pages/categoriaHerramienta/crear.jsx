import React, { useState } from "react";
import api from "../../api/api"; 
import { useNavigate } from "react-router-dom";

const CrearCategoriaHerramienta = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre_categoria: "",
    descripcion: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api.post("/categorias-herramienta", form)
      .then(() => {
        alert("Categoría creada correctamente");
        navigate("/categorias-herramienta");
      })
      .catch((err) => {
        console.error("Error al crear categoría:", err);
        alert("Ocurrió un error al guardar");
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-plus me-2"></i>Crear Categoría de Herramienta</h4>
          <button onClick={() => navigate("/categorias-herramienta")} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i> Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre de la Categoría</label>
              <input
                type="text"
                name="nombre_categoria"
                className="form-control"
                value={form.nombre_categoria}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                className="form-control"
                value={form.descripcion}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success">
              <i className="fas fa-save me-1"></i>Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CrearCategoriaHerramienta;
