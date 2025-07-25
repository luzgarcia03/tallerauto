import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalClients: 0,
    activeServices: 0,
    totalEmployees: 0,
    lowStockCount: 0,
    recentServices: [],
    lowStockItems: [],
    serviceStatus: {
      pendiente: 0,
      'en progreso': 0,
      completado: 0
    },
    monthlyRevenue: 0,
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        // Fetch all data in parallel
        const [clientesRes, serviciosRes, empleadosRes, lowStockRes] = await Promise.all([
          api.get('/clientes'),
          api.get('/servicios'),
          api.get('/empleados'),
          api.get('/repuestos/bajo-stock', { params: { threshold: 5 } })
        ]);
        const clientes = clientesRes.data || [];
        const servicios = serviciosRes.data || [];
        const empleados = empleadosRes.data || [];
        const lowStockItems = lowStockRes.data || [];

        // Service status distribution
        const statusCount = { pendiente: 0, 'en progreso': 0, completado: 0 };
        let monthlyRevenue = 0;
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();
        servicios.forEach(s => {
          const estado = (s.estado?.nombre_estado || '').toLowerCase();
          if (statusCount[estado] !== undefined) statusCount[estado]++;
          // Monthly revenue
          const fecha = new Date(s.fecha_servicio || s.createdAt || s.fecha || '');
          if (fecha && fecha.getMonth() === thisMonth && fecha.getFullYear() === thisYear) {
            monthlyRevenue += parseFloat(s.costo_estimado || s.costo || 0);
          }
        });

        // Recent services (last 5)
        const recentServices = [...servicios]
          .sort((a, b) => new Date(b.fecha_servicio || b.createdAt || b.fecha || 0) - new Date(a.fecha_servicio || a.createdAt || a.fecha || 0))
          .slice(0, 5)
          .map(s => ({
            id_servicio: s.id_servicio,
            tipo_mantenimiento_nombre: s.nombre_servicio || '-',
            cliente_nombre: s.cliente_nombre || '-',
            duracion: s.duracion_estimada || '-',
            costo: s.costo_estimado || 0,
            estado_general_nombre: s.estado?.nombre_estado || '-',
          }));

        setStats({
          totalClients: clientes.length,
          activeServices: statusCount['en progreso'],
          totalEmployees: empleados.length,
          lowStockCount: lowStockItems.length,
          recentServices,
          lowStockItems,
          serviceStatus: statusCount,
          monthlyRevenue,
          recentActivity: recentServices.map(s => ({
            icon: 'fa-wrench',
            description: `Servicio ${s.tipo_mantenimiento_nombre} para ${s.cliente_nombre}`,
            time: s.duracion || '-',
          }))
        });
      } catch (err) {
        setError('Error al cargar los datos del dashboard.');
        console.error('Dashboard data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard">
        <div className="error-container">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Panel de Control</h1>
        <div className="quick-actions">
          <button onClick={() => navigate('/servicios/crear')} className="action-btn primary">
            <i className="fas fa-plus"></i> Nuevo Servicio
          </button>
          <button onClick={() => navigate('/cliente/crear')} className="action-btn secondary">
            <i className="fas fa-user-plus"></i> Nuevo Cliente
          </button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="main-content">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon blue">
                <i className="fas fa-users"></i>
              </div>
              <div className="stat-info">
                <h3>Total Clientes</h3>
                <div className="stat-number">{stats.totalClients}</div>
                <a href="/clientes" className="stat-link">Ver todos</a>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon green">
                <i className="fas fa-wrench"></i>
              </div>
              <div className="stat-info">
                <h3>Servicios Activos</h3>
                <div className="stat-number">{stats.activeServices}</div>
                <a href="/servicios" className="stat-link">Ver todos</a>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon teal">
                <i className="fas fa-user-tie"></i>
              </div>
              <div className="stat-info">
                <h3>Empleados Activos</h3>
                <div className="stat-number">{stats.totalEmployees}</div>
                <a href="/empleados" className="stat-link">Ver todos</a>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon orange">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <div className="stat-info">
                <h3>Repuestos Bajo Stock</h3>
                <div className="stat-number">{stats.lowStockCount}</div>
                <a href="/repuestos" className="stat-link">Ver todos</a>
              </div>
            </div>
          </div>

          <div className="dashboard-row">
            <div className="dashboard-card">
              <div className="card-header">
                <h2>Estado de Servicios</h2>
              </div>
              <div className="service-status-grid">
                <div className="status-item pendiente">
                  <span className="status-number">{stats.serviceStatus.pendiente}</span>
                  <span className="status-label">Pendientes</span>
                </div>
                <div className="status-item in-progress">
                  <span className="status-number">{stats.serviceStatus['en progreso']}</span>
                  <span className="status-label">En Progreso</span>
                </div>
                <div className="status-item completed">
                  <span className="status-number">{stats.serviceStatus.completado}</span>
                  <span className="status-label">Completados</span>
                </div>
              </div>
            </div>

            <div className="dashboard-card">
              <div className="card-header">
                <h2>Ingresos del Mes</h2>
              </div>
              <div className="revenue-display">
                <span className="revenue-amount">Q {stats.monthlyRevenue.toFixed(2)}</span>
                <span className="revenue-label">Ingresos Totales</span>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h2>Servicios Recientes</h2>
              <button onClick={() => navigate('/servicios')} className="view-all-btn">
                Ver Todos
              </button>
            </div>
            <div className="table-responsive">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th>Servicio</th>
                    <th>Cliente</th>
                    <th>Duración</th>
                    <th>Costo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentServices.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center">No hay servicios recientes</td>
                    </tr>
                  ) : (
                    stats.recentServices.map((service, idx) => (
                      <tr key={idx}>
                        <td>{service.tipo_mantenimiento_nombre}</td>
                        <td>{service.cliente_nombre}</td>
                        <td>{service.duracion}</td>
                        <td>Q {parseFloat(service.costo).toFixed(2)}</td>
                        <td>
                          <span className={`status-badge ${service.estado_general_nombre.toLowerCase()}`}>
                            {service.estado_general_nombre}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => navigate(`/servicios/${service.id_servicio}`)}
                            className="action-btn small"
                          >
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="sidebar">
          <div className="dashboard-card">
            <div className="card-header">
              <h2>Repuestos Bajo Stock</h2>
              <button onClick={() => navigate('/repuestos')} className="view-all-btn">
                Ver Todos
              </button>
            </div>
            <div className="low-stock-list">
              {stats.lowStockItems.length === 0 ? (
                <p className="no-data">No hay repuestos con bajo stock</p>
              ) : (
                stats.lowStockItems.map((item) => (
                  <div key={item.id_repuesto} className="low-stock-item">
                    <div className="item-info">
                      <h4>{item.nombre_repuesto || item.nombre}</h4>
                      <p>Stock: {item.stock}</p>
                    </div>
                    <div className="item-price">
                      Q {parseFloat(item.precio_venta || item.precio || 0).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <h2>Actividad Reciente</h2>
            </div>
            <div className="activity-timeline">
              {stats.recentActivity.length === 0 ? (
                <p className="no-data">No hay actividad reciente</p>
              ) : (
                stats.recentActivity.map((activity, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">
                      <i className={`fas ${activity.icon}`}></i>
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">{activity.description}</p>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
