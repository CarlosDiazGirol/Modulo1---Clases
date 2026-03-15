// src/db/database.js
// Pool de conexiones a PostgreSQL (Supabase)

import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } // Requerido por Supabase
});

export default pool;
