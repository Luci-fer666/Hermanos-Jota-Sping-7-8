const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = asyncHandler(async (req, res, next) => {
    const {username, email, password, roles} = req.body;

    const existingUser = await User.findOne({ $or: [{email},{username}]});
    if (existingUser) {
        return res.status(400).json({message: 'El nombre de usuario o mail ya está registrado'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        roles
    });

    const savedUser = await newUser.save();

    // NO pasamos la contraseña!!!
    res.status(201).json({
        _id: savedUser._id,     // interno para postman
        username: savedUser.username,
        email: savedUser.email,
        roles: savedUser.roles
    });
});

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const usuario = await User.findOne({email: email});
    if (!usuario) {
        return res.status(400).json({message: "El email no se encuentra asociado a una cuenta."});
    }

    const passwordValido = await bcrypt.compare(password, usuario.password);
    if (!passwordValido) {
        return res.status(400).json({message: "Credenciales inválidas"});
    }

    const token = jwt.sign(
        {
            id: usuario._id,
            username: usuario.username,
            roles: usuario.roles //añado rol de usuario al token
        },
        process.env.JWT_SECRET
    );

    res.status(200).json({
        token,
        usuario: {
            id: usuario._id,
            username: usuario.username,
            email: usuario.email
        },
    });
});

const getAllUsers = asyncHandler(async (req, res) => {
    res.json(User);
});

const getUserById = asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const user = User.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
});

const getMyProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id; 

    const user = await User.findById(userId).select('-password');

    if (!user) {
        res.status(404);
        throw new Error('Usuario no encontrado');
    }

    res.json(user);
});

module.exports = {
    register,
    login,
    getAllUsers,
    getUserById,
    getMyProfile
};
