const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware.js');
const adminGuard = require('../middleware/authGuard.js');

const {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById,
} = require('../controllers/productControllers.js');


// GET /api/productos → devuelve todos los productos
router.get('/', getAllProducts);

// GET /api/productos/:id → devuelve un producto por ID
router.get('/:id', getProductById);

// POST /api/productos → crea un producto si el usuario es admin
router.post('/', authMiddleware, adminGuard, addProduct);

// PUT /api/productos/:id → actualiza un producto si el usuario es admin
router.put('/:id', authMiddleware, adminGuard, updateProductById);

// DELETE /api/productos/:id → borra un producto si el usuario es admin
router.delete('/:id', authMiddleware, adminGuard, deleteProductById);

module.exports = router;