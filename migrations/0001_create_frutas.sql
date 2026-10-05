CREATE TABLE IF NOT EXISTS frutas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL
);

INSERT INTO frutas (nombre) VALUES ('platano'), ('manzana');
