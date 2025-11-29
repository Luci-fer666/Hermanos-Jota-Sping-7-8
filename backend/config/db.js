const mongoose = require('mongoose');

const conectarBD = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('¡Conexión exitosa a MongoDB!');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', err);
        process.exit(1); // que no siga el programa
    }
}

module.exports = conectarBD;