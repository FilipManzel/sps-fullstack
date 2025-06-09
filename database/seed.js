const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const DB_FILE = path.join(__dirname, 'database.sqlite3');

const db = new sqlite3.Database(DB_FILE);

db.serialize(() => {
  db.run('DELETE FROM jidelnicek');
  const stmt = db.prepare('INSERT INTO jidelnicek (den, nazev_jidla, popis, alergeny) VALUES (?, ?, ?, ?)');
  stmt.run('Pondělí', 'Kuřecí řízek s bramborem', 'Smažený kuřecí řízek, vařené brambory', '1,3,7');
  stmt.run('Úterý', 'Rajská omáčka s těstovinami', 'Rajská omáčka, těstoviny', '1,3');
  stmt.run('Středa', 'Zeleninové rizoto', 'Rizoto s mrkví a hráškem', '');
  stmt.finalize();
});

db.close(() => {
  console.log('Databáze byla naplněna vzorovým jídelníčkem.');
});