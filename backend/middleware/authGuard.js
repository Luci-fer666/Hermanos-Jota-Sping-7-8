const adminGuard = (req, res, next) => {
    if (req.user && req.user.rol.includes('admin')) {
        next(); // lo dejamos pasar
    } else {
        res.status(403).json({message: 'Acceso denegado, no sos administrador.'});
    }
};

module.exports = adminGuard;