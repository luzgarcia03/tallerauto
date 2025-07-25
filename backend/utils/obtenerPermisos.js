const db = require('../config/database');

async function obtenerPermisosPorRol(idRol) {
  const [result] = await db.query(
    'SELECT P.nombre_permiso FROM rol_permiso RP JOIN permiso P ON RP.id_permiso = P.id_permiso WHERE RP.id_rol = ?',
    {
      replacements: [idRol],
    }
  );
  return result.map(r => r.nombre_permiso);
}

module.exports = obtenerPermisosPorRol;
