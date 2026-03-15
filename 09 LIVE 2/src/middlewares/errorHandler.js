// src/middlewares/errorHandler.js
// Se registra al final del todo en app.js (después del notFound)
// Recibe errores propagados con next(error) desde cualquier controller

export const errorHandler = (error, req, res, next) => {
    console.error('❌ Error:', error.message);

    res.status(500).json({
        ok: false,
        error: 'Internal server error'
    });
};
