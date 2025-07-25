// middleware/checkPermiso.js
module.exports = (permisoRequerido) => {
  return (req, res, next) => {
    const permisosHeader = req.headers.permisos;
    let permisos = [];

    try {
      if (permisosHeader) {
        permisos = JSON.parse(permisosHeader);
      }
    } catch (error) {
      return res.status(400).json({ error: 'Permisos mal formateados' });
    }

    if (!permisos.includes(permisoRequerido)) {
      return res.status(403).json({ mensaje: 'No tienes permiso para acceder a esta ruta' });
    }

    next();
  };
};
