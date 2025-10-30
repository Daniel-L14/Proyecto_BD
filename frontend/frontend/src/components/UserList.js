import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('https://ancient-specter-r4wpwjgr5gqg354xj-5001.app.github.dev/api/usuarios')
      .then(res => {
        console.log('Datos recibidos:', res.data); // 👈 esto nos servirá para verificar
        setUsers(res.data);
      })
      .catch(err => {
        console.error('Error al obtener usuarios:', err);
      });
  }, []);

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>{u.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
