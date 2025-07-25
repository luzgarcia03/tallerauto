import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api'; 

const RepuestoCrear = () => {
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
    api.get('/estados').then(res => setEstados(res.data));
    api.get('/categorias-repuesto').then(res => setCategorias(res.data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    api.post('/repuestos', form)
      .then(() => {
        alert('Repuesto creado con éxito');
        navigate('/repuesto');
      })
      .catch(() => alert('Error al crear repuesto'));
  };

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0"><i className="fas fa-cogs me-2"></i>Crear Repuesto</h4>
          <button onClick={() => navigate('/repuesto')} className="btn btn-outline-light">
            <i className="fas fa-arrow-left me-1"></i>Volver
          </button>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-4">
                <label>Categoría</label>
                <select name="categoria_id" className="form-control" required onChange={handleChange}>
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
                <input type="text" name="codigo_repuesto" className="form-control" required onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Nombre</label>
                <input type="text" name="nombre_repuesto" className="form-control" required onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Marca</label>
                <input type="text" name="marca" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label>Modelo Compatible</label>
                <input type="text" name="modelo_compatible" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-12">
                <label>Descripción</label>
                <textarea name="descripcion" className="form-control" onChange={handleChange}></textarea>
              </div>
              <div className="col-md-4">
                <label>Precio Compra</label>
                <input type="number" step="0.01" name="precio_compra" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Precio Venta</label>
                <input type="number" step="0.01" name="precio_venta" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Stock Mínimo</label>
                <input type="number" name="stock_minimo" className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-4">
                <label>Estado</label>
                <select name="id_estado" className="form-control" required onChange={handleChange}>
                  <option value="">Seleccione</option>
                  {estados.map(e => (
                    <option key={e.id_estado} value={e.id_estado}>{e.nombre_estado}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="text-end mt-3">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-save me-1"></i>Guardar Repuesto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RepuestoCrear;
