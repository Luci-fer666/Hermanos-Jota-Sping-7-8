const express = require('express');
const router = express.Router();
const users = require('../usuarios');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Logica de Usuarios
//Registro
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'El email o nombre de usuario ya está en uso.' });
    }
    if (
      !password ||
      password.length < 6 || !password.match(/[A-Z]/) || !password.match(/[\W_]/)                  
    ) {
      return res.status(400).json({
        message: "La contraseña no cumple con los requisitos de seguridad",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const nuevoUsuario = new User({
      username,
      email,
      password: hashedPassword,
    });
    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario creado', usuario: usuarioGuardado });

  } catch (error) {
    error.status = 400;
    next(error);
  }
});
//Login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isValidPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }
 
    const token = jwt.sign(
      { id: user._id, username: user.username }, 
      process.env.JWT_SECRET,                  
      { expiresIn: '1h' }                        
    );
    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
 
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});




// GET /users → devuelve todos los usuarios
router.get('/', (req, res) => {
  res.json(users);
});

// GET /users/:id → devuelve un usuario por ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json(user);
});

// POST /users → crear usuario (simulado)
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Usuario creado' });
});

module.exports = router;