// auth.controller.js
const authService = require('../services/user.service');
const { toUserCreateDTO } = require('../dto/usuario.dto');

const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await authService.register(username, password);

        // Mapea Entity -> DTO
        const userDto = toUserCreateDTO(user);

        res.status(201).json({ message: 'Usuario creado', userDto });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.json({ token });
    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res, next) => {
    try {
        res.json({ user: req.user });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login, getProfile };