const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {createOrder, getMyOrders} = require('../controllers/orderControllers.js');

router.post('/', authMiddleware, createOrder);

router.get('/', authMiddleware, getMyOrders);

module.exports = router;