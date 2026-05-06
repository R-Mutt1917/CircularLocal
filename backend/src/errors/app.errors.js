class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

class NotFoundError extends AppError {
    constructor(message = 'Recurso no encontrado') {
        super(message, 404);
    }
}

class BadRequestError extends AppError {
    constructor(message = 'Bad request') {
        super(message, 400);
    }
}

class ConflictError extends AppError {
    constructor(message = 'Conflicto') {
        super(message, 409);
    }
}

module.exports = {
    AppError,
    NotFoundError,
    BadRequestError,
    ConflictError
};
