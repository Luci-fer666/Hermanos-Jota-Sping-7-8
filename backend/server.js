require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const conectarBD = require('./config/db.js');
const Producto = require('./models/Product.js');
const Usuario = require('./models/User.js');
const Order = require('./models/Order.js');
const { notFound, errorHandlerServer } = require('./middleware/errorHandlers');

conectarBD();

// Middleware global para parsear JSON
app.use(express.json());

// para que se pueda enlazar con vercel
app.use(cors());

// Logger de peticiones
const logger = require('./logger');
app.use(logger);

// Routers
const userRoutes = require('./Routes/userRoutes');
const productRoutes = require('./Routes/productRoutes');
const orderRoutes = require('./Routes/orderRoutes.js');

app.use('/api/users', userRoutes);
app.use('/api/productos', productRoutes);
app.use('/api/mis-compras', orderRoutes);

// Ruta raíz solo para checkear que el servidor está vivo
app.get('/', (req, res) => {
  res.json({ message: '¡Bienvenido al servidor de Mueblería Jota!' });
});

// -----------------
// MANEJO DE ERRORES

// Middleware para rutas no encontradas (404)
app.use(notFound);

// Middleware de manejo de errores
app.use(errorHandlerServer);


// ----------------

// Levantar servidor
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT}`);
});