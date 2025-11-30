const asyncHandler = require('express-async-handler');
const Order = require('../models/Order.js');

const createOrder = asyncHandler(async (req, res) => {
    console.log("Usuario decodificado:", req.user);
    const {items, total} = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No hay productos en el pedido' });
    }

    const orderItems = items.map((item) => {
        return {
            product: item._id || item.id,      
            nombre: item.nombre || item.title, 
            cantidad: item.quantity || item.cantidad || 1, 
            precio: item.precio
        };
    });

    const newOrder = new Order({
        user: req.user.id || req.user._id,
        items: orderItems,
        total: total
    });

    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {
        console.error("ERROR AL GUARDAR EN MONGO:", error);
        res.status(500);
        throw new Error('Error al guardar la orden en la base de datos');
    }
});

module.exports = {createOrder};