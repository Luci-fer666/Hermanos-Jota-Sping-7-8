const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            nombre: String, 
            cantidad: { type: Number, default: 1 },
            precio: Number
        }
    ],
    total: {
        type: Number,
        required: true
    }
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema);