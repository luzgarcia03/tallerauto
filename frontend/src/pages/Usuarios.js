import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/usuarios')
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Listado de Usuarios</h2>
      <ul>
        {usuarios.map((u, i) => (
          <li key={i}>{u.nombre} - {u.correo}</li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
