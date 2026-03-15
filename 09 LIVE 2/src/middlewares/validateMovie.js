// src/middlewares/validateMovie.js
// Se ejecuta antes del controller en la ruta POST /movies
// Verifica que el body contiene los campos mínimos obligatorios

export const validateMovie = (req, res, next) => {
    const { title, year } = req.body;

    if (!title || !year) {
        return res.status(400).json({
            ok: false,
            error: 'Los campos title y year son obligatorios'
        });
    }

    next();
};
