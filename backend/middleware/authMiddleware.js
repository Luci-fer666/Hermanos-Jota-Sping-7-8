const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    if (!process.env.JWT_SECRET) {
        console.error("FATAL ERROR: JWT_SECRET no está definida en las variables de entorno.");
        return res.status(500).json({ message: "Error de configuración del servidor" });
    }


    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Estraer el token del encabezado
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({message: "No autorizado."});
        }

        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
            if (err) {
                return res.status(403).json({message: `Error: prohibido. Detalle: ${err.message}`});
            }

            // metemos los datos del usuario en la petición req
            req.user = decodedPayload;

            next();
        });
    } else {
        res.status(401).json({message: 'No autorizado: Debes iniciar sesión (Falta Token)'});
    }
}

module.exports = verifyToken;