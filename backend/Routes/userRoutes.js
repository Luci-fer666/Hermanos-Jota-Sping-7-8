const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');

const {
    register,
    login,
    getAllUsers,
    getUserById,
    getMyProfile,
} = require('../controllers/userControllers.js');

router.post('/register', register);

router.post('/login', login);

// GET /users → devuelve todos los usuarios
router.get('/', getAllUsers);

// GET /users/profile → devuelve la página del usuario logueado
router.get('/perfil', authMiddleware, getMyProfile);

// GET /users/:id → devuelve un usuario por ID
router.get('/:id', getUserById);

module.exports = router;