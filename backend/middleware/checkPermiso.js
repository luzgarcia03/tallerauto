const checkPermiso = (permisoRequerido) => {
  return (req, res, next) => {
    const permisosHeader = req.headers.permisos;

    let permisos = [];
    try {
      permisos = JSON.parse(permisosHeader || '[]');
    } catch (e) {
      return res.status(400).json({ error: 'Permisos mal formateados' });
    }

    if (permisos.includes(permisoRequerido)) {
      next();
    } else {
      res.status(403).json({ error: 'No tienes permiso para esta acción' });
    }
  };
};

module.exports = checkPermiso;
