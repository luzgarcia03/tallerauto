import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api"; 

const EditarCategoriaHerramienta = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre_categoria: "",
    descripcion: "",
  });

  useEffect(() => {
    api
      .get(`/categorias-herramienta/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => {
        console.error("Error al cargar categoría:", err);
        alert("Ocurrió un error al cargar la categoría");
      });
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .put(`/categorias-herramienta/${id}`, form)
      .then(() => {
        alert("Categoría actualizada correctamente");
        navigate("/categorias-herramienta");
      })
      .catch((err) => {
        console.error("Error al actualizar categoría:", err);
        alert("Ocurrió un error al actualizar");
      });
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-edit me-2"></i>Editar Categoría de Herramienta</h4>
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
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              <i className="fas fa-save me-1"></i>Actualizar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditarCategoriaHerramienta;
