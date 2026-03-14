// auth.controller.js
const authService = require('../services/user.service');
const { toUserCreateDTO } = require('../dto/usuario.dto');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await authService.register(username, password);
        
        // Mapea Entity -> DTO
        const userDto = toUserCreateDTO(user);
        
        res.status(201).json({ message: 'Usuario creado', userDto });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await authService.login(username, password);
        res.json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

const getProfile = async (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { register, login, getProfile };