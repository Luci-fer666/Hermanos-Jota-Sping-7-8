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

const updateProductById = asyncHandler(async (req, res, next) => {
    const productoId = req.params.id;
    const datosActualizados = req.body;

    const productoActualizado = await Product.findByIdAndUpdate(productoId, datosActualizados, {new: true, runValidators: true});

    if (!productoActualizado) {
        const error = new Error('Producto no encontrado para actualizar');
        error.status = 404;
        return next(error);
    }

    res.status(200).json({
        message: 'Producto actualizado con exito!',
      producto: productoActualizado
    });
});

const deleteProductById = asyncHandler(async (req, res, next) => {
    const productoId = req.params.id;
    const productoEliminado = await Product.findByIdAndDelete(productoId);

    if (!productoEliminado) {
      const error = new Error('No se encontró el producto a eliminar.');
      error.status(404);
      return next(error);
    }

    res.status(200).json({
      message: 'Producto eliminado con exito!',
      producto: productoEliminado
    });
});

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProductById,
    deleteProductById
};