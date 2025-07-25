import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api/api'; // ✅ Cliente centralizado

const RepuestoEditar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [estados, setEstados] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [form, setForm] = useState({
    categoria_id: '',
    codigo_repuesto: '',
    nombre_repuesto: '',
    descripcion: '',
    marca: '',
    modelo_compatible: '',
    precio_compra: '',
    precio_venta: '',
    stock_minimo: '',
    id_estado: ''
  });

  useEffect(() => {
    // Cargar catálogos
    api.get('/estados').then(res => setEstados(res.data));
    api.get('/categorias-repuesto').then(res => setCategorias(res.data));

    // Cargar datos del repuesto actual
    api.get(`/repuestos/${id}`)
      .then(res => {
        const data = res.data;
        setForm({
          categoria_id: data.categoria_id || '',
          codigo_repuesto: data.codigo_repuesto || '',
          nombre_repuesto: data.nombre_repuesto || '',
          descripcion: data.descripcion || '',
          marca: data.marca || '',
          modelo_compatible: data.modelo_compatible || '',
          precio_compra: data.precio_compra || '',
          precio_venta: data.precio_venta || '',
          stock_minimo: data.stock_minimo || '',
          id_estado: data.estado?.id_estado || data.id_estado || ''
        });
      })
      .catch(() => {
        alert('No se pudo cargar el repuesto');
        navigate('/repuesto');
      });
  }, [id, navigate]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.put(`/repuestos/${id}`, form)
      .then(() => {
        alert('Repuesto actualizado con éxito');
        navigate('/repuesto');
      })
      .catch(() => alert('Error al actualizar repuesto'));
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-warning text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-edit me-2"></i>Editar Repuesto</h4>
          <button onClick={() => navigate('/repuesto')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i>Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <label>Categoría</label>
                <select name="categoria_id" className="form-control" required value={form.categoria_id} onChange={handleChange}>
                  <option value="">Seleccione</option>
                  {categorias.map(c => (
                    <option key={c.id_categoria_repuesto} value={c.id_categoria_repuesto}>
                      {c.nombre_categoria}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4">
                <label>Código</label>
                <input type="text" name="codigo_repuesto" className="form-control" required value={form.codigo_repuesto} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Nombre</label>
                <input type="text" name="nombre_repuesto" className="form-control" required value={form.nombre_repuesto} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Marca</label>
                <input type="text" name="marca" className="form-control" value={form.marca} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Modelo Compatible</label>
                <input type="text" name="modelo_compatible" className="form-control" value={form.modelo_compatible} onChange={handleChange} />
              </div>
              <div className="col-md-12">
                <label>Descripción</label>
                <textarea name="descripcion" className="form-control" value={form.descripcion} onChange={handleChange}></textarea>
              </div>
              <div className="col-md-4">
                <label>Precio Compra</label>
                <input type="number" step="0.01" name="precio_compra" className="form-control" value={form.precio_compra} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Precio Venta</label>
                <input type="number" step="0.01" name="precio_venta" className="form-control" value={form.precio_venta} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Stock Mínimo</label>
                <input type="number" name="stock_minimo" className="form-control" value={form.stock_minimo} onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Estado</label>
                <select name="id_estado" className="form-control" required value={form.id_estado} onChange={handleChange}>
                  <option value="">Seleccione</option>
                  {estados.map(e => (
                    <option key={e.id_estado} value={e.id_estado}>{e.nombre_estado}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-end mt-3">
              <button type="submit" className="btn btn-warning">
                <i className="fas fa-save me-1"></i>Actualizar Repuesto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RepuestoEditar;
