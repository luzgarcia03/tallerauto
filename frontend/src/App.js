import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Usuarios from './pages/Usuarios';
import ClienteIndex from './pages/cliente/index';
import ClienteCrear from './pages/cliente/crear';
import ClienteVer from './pages/cliente/ver';
import ClienteEditar from './pages/cliente/editar';
import EstadoIndex from './pages/estado/index';
import EstadoCrear from './pages/estado/crear';
import EstadoEditar from './pages/estado/editar';
import ProveedorIndex from './pages/proveedor/index';
import ProveedorCrear from './pages/proveedor/crear';
import ProveedorEditar from './pages/proveedor/editar';
import ProveedorVer from './pages/proveedor/ver';
import CategoriaRepuestoIndex from './pages/categoriaRepuesto/index';
import CategoriaRepuestoCrear from './pages/categoriaRepuesto/crear';
import CategoriaRepuestoEditar from './pages/categoriaRepuesto/editar';
import CategoriaRepuestoVer from './pages/categoriaRepuesto/ver';
import RepuestoIndex from './pages/repuesto/index';
import RepuestoCrear from './pages/repuesto/crear';
import RepuestoEditar from './pages/repuesto/editar';
import RepuestoVer from './pages/repuesto/ver';
import MarcaVehiculoIndex from './pages/marcaVehiculo/index';
import MarcaVehiculoCrear from './pages/marcaVehiculo/crear';
import MarcaVehiculoEditar from './pages/marcaVehiculo/editar';
import MarcaVehiculoVer from './pages/marcaVehiculo/ver';
import TipoVehiculoIndex from './pages/tipoVehiculo/index';
import TipoVehiculoCrear from './pages/tipoVehiculo/crear';
import TipoVehiculoEditar from './pages/tipoVehiculo/editar';
import TipoVehiculoVer from './pages/tipoVehiculo/ver';
import EmpleadoIndex from './pages/empleado/index';
import EmpleadoCrear from './pages/empleado/crear';
import EmpleadoEditar from './pages/empleado/editar';
import EmpleadoVer from './pages/empleado/ver';
import TipoMantenimientoIndex from './pages/tipoMantenimiento/index';
import TipoMantenimientoCrear from './pages/tipoMantenimiento/crear';
import TipoMantenimientoEditar from './pages/tipoMantenimiento/editar';
import TipoMantenimientoVer from './pages/tipoMantenimiento/ver';
import EstadoPagoIndex from './pages/estadoPago/index';
import EstadoPagoCrear from './pages/estadoPago/crear';
import EstadoPagoEditar from './pages/estadoPago/editar';
import Login from './pages/auth/login';
import Register from './pages/auth/register';
import Perfil from './pages/perfil/index';
import EstadoGeneralIndex from './pages/estadoGeneral/index';
import EstadoGeneralCrear from './pages/estadoGeneral/crear';
import EstadoGeneralEditar from './pages/estadoGeneral/editar';
import CrearServicio from './pages/servicio/crear';
import EditarServicio from './pages/servicio/editar';
import ServiciosIndex from './pages/servicio/index';
import ServicioVer from './pages/servicio/ver';
import CategoriaHerramientaIndex from './pages/categoriaHerramienta/index';
import CategoriaHerramientaCrear from './pages/categoriaHerramienta/crear';
import CategoriaHerramientaEditar from './pages/categoriaHerramienta/editar';
import SolicitudHerramientaIndex from './pages/solicitudHerramienta';
import SolicitudHerramientaCrear from './pages/solicitudHerramienta/crear';
import SolicitudHerramientaEditar from './pages/solicitudHerramienta/editar';
import SolicitudHerramientaVer from './pages/solicitudHerramienta/ver';
import AsignarPermisosRol from './pages/roles/AsignarPermisosRol';
import SessionTimeout from "./components/SessionTimeout";

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
            {token && <SessionTimeout />} {/* ✅ Solo si el usuario está autenticado */}

      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rutas protegidas */}
        {token ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="usuarios" element={<Usuarios />} />
            <Route path="cliente" element={<ClienteIndex />} />
            <Route path="cliente/crear" element={<ClienteCrear />} />
            <Route path="cliente/ver/:id" element={<ClienteVer />} />
            <Route path="cliente/editar/:id" element={<ClienteEditar />} />
            <Route path="estado" element={<EstadoIndex />} />
            <Route path="estado/crear" element={<EstadoCrear />} />
            <Route path="estado/editar/:id" element={<EstadoEditar />} />
            <Route path="proveedor" element={<ProveedorIndex />} />
            <Route path="proveedor/crear" element={<ProveedorCrear />} />
            <Route path="proveedor/ver/:id" element={<ProveedorVer />} />
            <Route path="proveedor/editar/:id" element={<ProveedorEditar />} />
            <Route path="categoria-repuesto" element={<CategoriaRepuestoIndex />} />
            <Route path="categoria-repuesto/crear" element={<CategoriaRepuestoCrear />} />
            <Route path="categoria-repuesto/editar/:id" element={<CategoriaRepuestoEditar />} />
            <Route path="categoria-repuesto/ver/:id" element={<CategoriaRepuestoVer />} />
            <Route path="repuesto" element={<RepuestoIndex />} />
            <Route path="repuesto/crear" element={<RepuestoCrear />} />
            <Route path="repuesto/editar/:id" element={<RepuestoEditar />} />
            <Route path="repuesto/ver/:id" element={<RepuestoVer />} />
            <Route path="marca-vehiculo" element={<MarcaVehiculoIndex />} />
            <Route path="marca-vehiculo/crear" element={<MarcaVehiculoCrear />} />
            <Route path="marca-vehiculo/editar/:id" element={<MarcaVehiculoEditar />} />
            <Route path="marca-vehiculo/ver/:id" element={<MarcaVehiculoVer />} />
            <Route path="tipo-vehiculo" element={<TipoVehiculoIndex />} />
            <Route path="tipo-vehiculo/crear" element={<TipoVehiculoCrear />} />
            <Route path="tipo-vehiculo/editar/:id" element={<TipoVehiculoEditar />} />
            <Route path="tipo-vehiculo/ver/:id" element={<TipoVehiculoVer />} />
            <Route path="empleado" element={<EmpleadoIndex />} />
            <Route path="empleado/crear" element={<EmpleadoCrear />} />
            <Route path="empleado/editar/:id" element={<EmpleadoEditar />} />
            <Route path="empleado/ver/:id" element={<EmpleadoVer />} />
            <Route path="tipo-mantenimiento" element={<TipoMantenimientoIndex />} />
            <Route path="tipo-mantenimiento/crear" element={<TipoMantenimientoCrear />} />
            <Route path="tipo-mantenimiento/editar/:id" element={<TipoMantenimientoEditar />} />
            <Route path="tipo-mantenimiento/ver/:id" element={<TipoMantenimientoVer />} />
            <Route path="estado-pago" element={<EstadoPagoIndex />} />
            <Route path="estado-pago/crear" element={<EstadoPagoCrear />} />
            <Route path="estado-pago/editar/:id" element={<EstadoPagoEditar />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="estado-general" element={<EstadoGeneralIndex />} />
            <Route path="estado-general/crear" element={<EstadoGeneralCrear />} />
            <Route path="estado-general/editar/:id" element={<EstadoGeneralEditar />} />
            <Route path="servicios" element={<ServiciosIndex />} />
            <Route path="servicios/crear" element={<CrearServicio />} />
            <Route path="servicios/editar/:id" element={<EditarServicio />} />
            <Route path="servicios/ver/:id" element={<ServicioVer />} />
            <Route path="categorias-herramienta" element={<CategoriaHerramientaIndex />} />
            <Route path="categorias-herramienta/crear" element={<CategoriaHerramientaCrear />} />
            <Route path="categorias-herramienta/editar/:id" element={<CategoriaHerramientaEditar />} />
            <Route path="solicitud-herramienta" element={<SolicitudHerramientaIndex />} />
            <Route path="solicitud-herramienta/crear" element={<SolicitudHerramientaCrear />} />
            <Route path="solicitud-herramienta/editar/:id" element={<SolicitudHerramientaEditar />} />
            <Route path="solicitud-herramienta/ver/:id" element={<SolicitudHerramientaVer />} />
            <Route path="roles/asignar-permisos/:id" element={<AsignarPermisosRol />} />

          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;