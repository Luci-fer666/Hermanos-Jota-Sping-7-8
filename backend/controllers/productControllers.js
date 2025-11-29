const asyncHandler = require('express-async-handler');
const Product = require('../models/Product.js');

const getAllProducts = asyncHandler(async (req, res) => {
    const todosLosProductos = await Product.find({});
    res.json(todosLosProductos);
});

const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const productoEncontrado = await Product.findById(id);
    
    if (!productoEncontrado) {
    return res.status(404).json({ message: 'Producto no encontrado' });
    }
    
    res.json(productoEncontrado);
});

const addProduct = asyncHandler(async (req, res) => {
    const nuevoProducto = new Product(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json({message: 'Producto creado', producto: productoGuardado});
});

module.exports = {
    getAllProducts,
    getProductById,
    addProduct
};