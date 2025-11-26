const express = require('express');
const router = express.Router();
const users = require('../usuarios');
const Usuario = require('./DB/models/User');
const bcrypt = require('bcrypt');


//Logica de Usuarios
router.post('/register', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'El email o nombre de usuario ya está en uso.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const nuevoUsuario = new Usuario({
      username,
      email,
      password: hashedPassword,}
    );

    const usuarioGuardado = await nuevoUsuario.save();
    res.status(201).json({message: 'Usuario creado', usuario: usuarioGuardado});

  } catch (error) {
    error.status = 400;
    next(error);
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