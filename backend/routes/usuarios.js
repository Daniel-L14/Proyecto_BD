const express = require('express');
const router = express.Router();
const db = require('../config/database');

// 🟢 Obtener todos los usuarios
router.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios ORDER BY id DESC';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      return res.status(500).json({
        error: 'Error al obtener usuarios',
        details: err.message
      });
    }
    res.json(results);
  });
});

// 🟢 Crear nuevo usuario
router.post('/', (req, res) => {
  const { nombre, email, telefono } = req.body;

  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
  }

  const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
  db.query(query, [nombre, email, telefono], (err, result) => {
    if (err) {
      console.error('Error al crear usuario:', err);
      return res.status(500).json({
        error: 'Error al crear usuario',
        details: err.message
      });
    }
    res.json({ message: '✅ Usuario creado correctamente', id: result.insertId });
  });
});

// 🟡 Actualizar usuario por ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono } = req.body;

  const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
  db.query(query, [nombre, email, telefono, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar usuario:', err);
      return res.status(500).json({
        error: 'Error al actualizar usuario',
        details: err.message
      });
    }
    res.json({ message: '✏️ Usuario actualizado correctamente' });
  });
});

// 🔴 Eliminar usuario por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM usuarios WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar usuario:', err);
      return res.status(500).json({
        error: 'Error al eliminar usuario',
        details: err.message
      });
    }
    res.json({ message: '🗑️ Usuario eliminado correctamente' });
  });
});

module.exports = router;
