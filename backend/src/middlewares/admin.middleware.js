const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).json({ error: 'Token requerido' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await User.findByPk(decoded.id);

        // Valida que el usuario este activo
        if (!user || !user.activo) {
            return res.status(401).json({ error: 'Usuario inválido' });
        }

        // Valida que el usuario sea admin
        if (user.rol !== 'ADMIN') {
            return res.status(403).json({ error: 'No puede acceder a este sitio' });
        }

        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = { verifyAdmin };