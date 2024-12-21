const express = require('express');
const router = express.Router();
const db = require('../db');
const { productSchema } = require('../validations/productSchema');

router.post('/', async (req, res) => {
  try {
    await productSchema.validate(req.body);
    const { name, description, price } = req.body;
    db.query('INSERT INTO productos (name, description, price) VALUES (?, ?, ?)', [name, description, price], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: result.insertId, name, description, price });
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

router.put('/:id', async (req, res) => {
  try {
    await productSchema.validate(req.body);
    const { id } = req.params;
    const { name, description, price } = req.body;
    db.query('UPDATE productos SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ id, name, description, price });
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ message: 'Producto eliminado' });
    }
  });
});

module.exports = router;
