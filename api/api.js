const express = require('express');
const db = require('../database/db');

const router = express.Router();

// Získání všech jídel
router.get('/jidelnicek', (req, res) => {
  db.all('SELECT * FROM jidelnicek', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Přidání nového jídla
router.post('/jidelnicek', (req, res) => {
  const { den, nazev_jidla, popis } = req.body;
  db.run(
    'INSERT INTO jidelnicek (den, nazev_jidla, popis) VALUES (?, ?, ?)',
    [den, nazev_jidla, popis],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Smazání jídla
router.delete('/jidelnicek/:id', (req, res) => {
  db.run(
    'DELETE FROM jidelnicek WHERE id = ?',
    [req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      if (this.changes === 0) return res.status(404).json({ error: 'Not found' });
      res.json({ success: true });
    }
  );
});

module.exports = router;