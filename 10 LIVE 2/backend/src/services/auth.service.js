// backend/src/services/auth.service.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/database.js';

const login = async (email, password) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) throw new Error('Credenciales inválidas');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Credenciales inválidas');

    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    return token;
};

export const authService = { login };
