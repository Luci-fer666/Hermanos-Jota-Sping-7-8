const express = require('express');
const router = express.Router();

const {
    register,
    login,
    getAllUsers,
    getUserById,
} = require('../controllers/userControllers.js');

router.post('/register', register);

router.post('/login', login);

// GET /users → devuelve todos los usuarios
router.get('/', getAllUsers);

// GET /users/:id → devuelve un usuario por ID
router.get('/:id', getUserById);

module.exports = router;