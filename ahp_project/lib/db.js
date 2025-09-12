// src/lib/db.js
import mysql from "mysql2/promise";

let pool;
export function getPool() {
  if (!pool) {
    const base = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
    };

    // Coba aktifkan SSL kalau hosting mendukung. Jika gagal, hapus properti ssl-nya.
    pool = mysql.createPool({
      ...base,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}
