const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_FILE = path.join(__dirname, '../database.sqlite3');

// Pokud databáze neexistuje, vytvoř tabulku
if (!fs.existsSync(DB_FILE)) {
  const dbInit = new sqlite3.Database(DB_FILE);
  dbInit.serialize(() => {
    dbInit.run(`
      CREATE TABLE IF NOT EXISTS jidelnicek (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        den TEXT NOT NULL,
        nazev_jidla TEXT NOT NULL,
        popis TEXT
      )
    `);
  });
  dbInit.close();
}

const db = new sqlite3.Database(DB_FILE);
module.exports = db;
