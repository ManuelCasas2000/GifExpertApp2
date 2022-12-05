const { response } = require("express")

// Como este middleware se va a ejecutar después de validarJWT en router.delete ya tengo en req.usuario la información que necesito

const esAdminRole = (req, res = response, next) => {
    if(!req.usuario) { // Esta comprobación la hago por si se llama a este middleware sin llamar antes a validarJWT
        return res.status(500).json({
            msg: 'Se quiere consultar el role sin validar primero el token (JWT).'
        })
    };

    const {rol, nombre} = req.usuario;

    if(rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${nombre} no es administrador y no tiene permiso para esta petición.`
        })
    }

    next();
}

const tieneRol = (...roles) => { // Le paso como argumento un array (Rest) con los roles que quiero validar y para cojer los datos
                                 // del req.usuario donde esta la información que necesito, retorno una función
    return (req, res = response, next) => {
        if(!req.usuario) { // Vuelvo a hacer aqui esta comprobación por si se llama a este middleware sin llamar antes a validarJWT
            return res.status(500).json({
                msg: 'Se quiere consultar el role sin validar primero el token (JWT).'
            });
        };

        if(!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El usuario ${req.usuario.nombre} con role ${req.usuario.rol} no tiene ninguno de los roles ${roles}.`
            });
        };

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRol
}