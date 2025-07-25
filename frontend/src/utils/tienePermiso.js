const tienePermiso = (permiso) => {
  try {
    const permisos = JSON.parse(localStorage.getItem('permisos') || '[]');
    return permisos.includes(permiso);
  } catch (e) {
    console.error('Error al leer permisos del localStorage:', e);
    return false;
  }
};

export default tienePermiso;
