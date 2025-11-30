const asyncHandler = require('express-async-handler');
const Order = require('../models/Order.js');

const createOrder = asyncHandler(async (req, res) => {
    const {items, total} = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: 'No hay productos en el pedido' });
    }

    const newOrder = new Order({
        user: req.user.id, // saco el id del token
        items: items,
        total: total
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
});

module.exports = {createOrder};