const { Conversacion, ConversacionesUsuarios, Mensajes, User } = require('../models');

// ─────────────────────────────────────────────
// Traer todas las conversaciones de un usuario
// ─────────────────────────────────────────────
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

// ─────────────────────────────────────────────
// Buscar si ya existe una conversación entre dos usuarios
// ─────────────────────────────────────────────
const findBetweenUsers = async (userIdA, userIdB) => {
    // Busco conversaciones donde esté userIdA
    const filas = await ConversacionesUsuarios.findAll({
        where: { userId: userIdA },
        attributes: ['conversationId'],
    });

    const conversationIds = filas.map((f) => f.conversationId);

    if (conversationIds.length === 0) return null;

    // De esas, busco una donde también esté userIdB
    const coincidencia = await ConversacionesUsuarios.findOne({
        where: {
            userId: userIdB,
            conversationId: conversationIds,  // Sequelize hace IN (...)
        },
    });

    if (!coincidencia) return null;

    return { id: coincidencia.conversationId };
};

// ─────────────────────────────────────────────
// Crear conversación nueva entre dos usuarios
// ─────────────────────────────────────────────
const createConversacion = async (userIdA, userIdB) => {
    // Sequelize no tiene transacciones automáticas, la manejamos manual
    const t = await Conversacion.sequelize.transaction();

    try {
        const conversacion = await Conversacion.create(
            {
                ultimoMensaje: '',
                fechaActualizacion: new Date(),
            },
            { transaction: t }
        );

        // Insertar ambos participantes en la tabla intermedia
        await ConversacionesUsuarios.bulkCreate(
            [
                { conversationId: conversacion.id, userId: userIdA },
                { conversationId: conversacion.id, userId: userIdB },
            ],
            { transaction: t }
        );

        await t.commit();
        return conversacion;

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = {
    getUserConversations,
    findBetweenUsers,
    createConversacion,
};