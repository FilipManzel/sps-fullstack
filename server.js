const express = require('express');
const path = require('path');
const apiRouter = require('./api/api');

const app = express();
const PORT = 3000;

// Middleware pro JSON
app.use(express.json());

// Statické soubory
app.use(express.static(path.join(__dirname, 'public')));

// API router
app.use('/api', apiRouter);

// Spuštění serveru
app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});













