const intercambioService = require('../services/intercambio.service');

const confirmarIntercambio = async (req, res) => {
    try {
        const intercambioId = req.params.id;
        const userId = req.user.id;

        if (isNaN(intercambioId)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const intercambio = await intercambioService.confirmarIntercambio(intercambioId, userId);

        if (!intercambio) {
            return res.status(404).json({ message: "Intercambio no encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const cancelarIntercambio = async (req, res) => {
    try {
        const intercambioId = req.params.id;
        const userId = req.user.id;

        if (isNaN(intercambioId)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const intercambio = await intercambioService.cancelarIntercambio(intercambioId, userId);

        if (!intercambio) {
            return res.status(404).json({ message: "Intercambio no encontrado" });
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const obtenerIntercambiosCompletados = async (req, res) => {
    try {
        const userId = req.user.id;

        const cantidadIntercambios = await intercambioService.obtenerIntercambiosCompletados(userId);

        res.status(200).json(cantidadIntercambios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = {
    confirmarIntercambio,
    cancelarIntercambio,
    obtenerIntercambiosCompletados,
};
