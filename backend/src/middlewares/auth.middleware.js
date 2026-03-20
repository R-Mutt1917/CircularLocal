const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Valida que el usuario este activo
        const user = await User.findByPk(decoded.id);
        if (!user || !user.activo) {
            return res.status(401).json({ error: 'Usuario inválido' });
        }

        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = { verifyToken };