const { Conversacion, Mensaje } = require('../models');
const { Op } = require('sequelize');

exports.startConversation = async (participante1_id, participante2_id) => {
    // Buscar en ambas direcciones
    let conversacion = await Conversacion.findOne({
        where: { participante1_id, participante2_id }
    });
    if (!conversacion) {
        conversacion = await Conversacion.findOne({
            where: {
                participante1_id: participante2_id,
                participante2_id: participante1_id
            }
        });
    }
    if (!conversacion) {
        conversacion = await Conversacion.create({ participante1_id, participante2_id });
    }
    return conversacion;
};

exports.getMessages = async (conversacionId) => {
    return await Mensaje.findAll({
        where: { conversacion_id: conversacionId },
        order: [['createdAt', 'ASC']]
    });
};

exports.getConversaciones = async (userId) => {
    return await Conversacion.findAll({
        where: {
            [Op.or]: [
                { participante1_id: userId },
                { participante2_id: userId }
            ]
        },
        order: [['updatedAt', 'DESC']]
    });
};