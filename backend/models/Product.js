const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number
    },
    imagenUrl:{
        type: String
    }}, {
        timestamps: true, // lo agrego para más control, no es necesario
        strict: false
    }
);

const Product = mongoose.model('Product', productSchema);
module.exports = Product;