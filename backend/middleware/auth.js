const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'claveSuperSecreta';

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ mensaje: 'Token inválido o expirado' });
  }
};
