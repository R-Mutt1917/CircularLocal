const { Intercambio } = require('../models');

const crearIntercambio = async (solicitudId) => {
    return Intercambio.create({
        solicitudId: solicitudId,
        estadoIntercambio: 'EN_PROCESO',
    });
}

module.exports = {
    crearIntercambio,
};
