const intercambioService = require('../services/intercambio.service');

const confirmarIntercambio = async (req, res, next) => {
    try {
        const intercambioId = req.params.id;
        const userId = req.user.id;

        if (isNaN(intercambioId)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const intercambio = await intercambioService.confirmarIntercambio(intercambioId, userId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

const cancelarIntercambio = async (req, res, next) => {
    try {
        const intercambioId = req.params.id;
        const userId = req.user.id;

        if (isNaN(intercambioId)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const intercambio = await intercambioService.cancelarIntercambio(intercambioId, userId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

const obtenerIntercambiosCompletados = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const cantidadIntercambios = await intercambioService.obtenerIntercambiosCompletados(userId);

        res.status(200).json(cantidadIntercambios);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    confirmarIntercambio,
    cancelarIntercambio,
    obtenerIntercambiosCompletados,
};
