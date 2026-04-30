const { Conversacion, ConversacionesUsuarios } = require('../models');

const getUserConversations = async (userId) => {
    const conversaciones = await Conversacion.findAll({
        include: [
            {
                model: ConversacionesUsuarios,
                where: { userId },
                attributes: ['cantidadNoLeidos', 'fechaUltimoLeido'],
            },
        ],
        order: [['fechaActualizacion', 'DESC']],
    });

    return conversaciones;
};

module.exports = {
    getUserConversations,
};