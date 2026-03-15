// src/middlewares/authMiddleware.js
// Verifica que la petición lleva un token JWT válido
// Si el token es válido, añade req.user con los datos del usuario

import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    // El token se envía en el header: Authorization: Bearer TOKEN
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ ok: false, error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verificamos y decodificamos el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Disponible en todos los controllers siguientes
        next();
    } catch (error) {
        res.status(401).json({ ok: false, error: 'Token inválido o expirado' });
    }
};
