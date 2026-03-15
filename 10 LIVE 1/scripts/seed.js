// scripts/seed.js
// Inserta usuarios de prueba en la tabla users de Supabase
// Ejecutar con: node scripts/seed.js

import pg from 'pg';
import bcrypt from 'bcrypt';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const users = [
    { email: 'ana@example.com', password: 'password123', role: 'user' },
    { email: 'admin@example.com', password: 'admin123', role: 'admin' }
];

console.log('🌱 Insertando usuarios de prueba...');

for (const user of users) {
    const hash = await bcrypt.hash(user.password, 10);
    await pool.query(
        `INSERT INTO users (email, password, role)
         VALUES ($1, $2, $3)
         ON CONFLICT (email) DO NOTHING`,
        [user.email, hash, user.role]
    );
    console.log(`✅ Usuario creado: ${user.email} (rol: ${user.role})`);
}

await pool.end();
console.log('✅ Seed completado.');
