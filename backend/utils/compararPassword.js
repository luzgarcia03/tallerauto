const bcrypt = require('bcrypt');

function compararPassword(hashGuardado, passwordIngresado) {
  return bcrypt.compareSync(passwordIngresado, hashGuardado);
}

module.exports = compararPassword;
