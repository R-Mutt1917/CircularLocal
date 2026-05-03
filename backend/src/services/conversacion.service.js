const { Conversacion, ConversacionesUsuarios, User, Perfil } = require('../models');
const { Op } = require('sequelize');

const getUserConversations = async (userId) => {
    const conversaciones = await Conversacion.findAll({
        include: [
            {
                model: ConversacionesUsuarios,
                as: 'miRelacion',
                where: { userId },
                attributes: ['cantidadNoLeidos', 'fechaUltimoLeido'],
            },
            {
                model: ConversacionesUsuarios,
                as: 'participantes',
                include: [
                    {
                        model: User,
                        attributes: ['id'],
                        where: {
                            id: { [Op.ne]: userId } // excluye al usuario actual
                        },
                        include: [
                            {
                                model: Perfil,
                                as: 'perfil',
                                attributes: ['nombre_perfil', 'imagen']
                            }
                        ]
                    }
                ],
            }
        ],
        order: [['fechaActualizacion', 'DESC']],
    });

    return conversaciones;
};

module.exports = {
    getUserConversations,
};