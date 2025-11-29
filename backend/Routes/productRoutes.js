const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const adminGuard = require('../middleware/authGuard.js');

const {
    getAllProducts,
    getProductById,
    addProduct,
} = require('../controllers/productControllers.js');


// GET /productos → devuelve todos los productos
router.get('/', getAllProducts);

// GET /productos/:id → devuelve un producto por ID
router.get('/:id', getProductById);

// POST /productos → crea un producto si el usuario es admin
router.post('/', authMiddleware, adminGuard, addProduct);

module.exports = router;