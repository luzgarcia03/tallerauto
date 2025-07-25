const jwt = require('jsonwebtoken');

function generarToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'clave-secreta', {
    expiresIn: '15m'
  });
}

module.exports = generarToken;
