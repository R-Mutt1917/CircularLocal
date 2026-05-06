const { AppError } = require('../errors/app.errors');

function errorHandler(err, req, res, next) {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message
        });
    }

    // error inesperado
    res.status(500).json({
        error: 'Error interno del servidor'
    });
};

module.exports = errorHandler;