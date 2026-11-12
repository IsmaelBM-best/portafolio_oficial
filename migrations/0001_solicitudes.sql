CREATE TABLE IF NOT EXISTS solicitudes (
  id TEXT PRIMARY KEY,
  fecha TEXT NOT NULL,
  nombre TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  necesidad TEXT NOT NULL,
  estado TEXT NOT NULL DEFAULT 'Nueva',
  origen_hash TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS solicitudes_origen_fecha ON solicitudes(origen_hash, fecha);
