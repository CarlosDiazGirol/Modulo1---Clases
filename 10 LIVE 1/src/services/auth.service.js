// src/services/auth.service.js
// Lógica de autenticación: buscar usuario y generar token

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../db/database.js';

const login = async (email, password) => {
    // 1. Buscar el usuario en la base de datos
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    const user = result.rows[0];

    // 2. Si el usuario no existe, lanzar error
    if (!user) {
        throw new Error('Credenciales inválidas');
    }

    // 3. Comparar la contraseña con el hash guardado
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Credenciales inválidas');
    }

    // 4. Generar el token JWT
    // El payload incluye los datos que queremos tener disponibles sin consultar la BD
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '2h' }
    );

    return token;
};

export const authService = { login };
