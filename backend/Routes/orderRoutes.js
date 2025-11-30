const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const {createOrder} = require('../controllers/orderControllers.js');

router.post('/', authMiddleware, createOrder);

module.exports = router;