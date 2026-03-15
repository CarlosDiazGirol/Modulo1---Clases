// src/middlewares/requireRole.js
// Factory que devuelve un middleware para verificar el rol del usuario
// Se usa después de authMiddleware

export const requireRole = (role) => {
    return (req, res, next) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({
                ok: false,
                error: `Acceso denegado. Se requiere rol: ${role}`
            });
        }
        next();
    };
};
