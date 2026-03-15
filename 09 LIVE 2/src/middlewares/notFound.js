// src/middlewares/notFound.js
// Se registra después de todas las rutas en app.js
// Captura cualquier petición a una URL que no exista

export const notFound = (req, res) => {
    res.status(404).json({
        ok: false,
        error: `Ruta no encontrada: ${req.method} ${req.url}`
    });
};
