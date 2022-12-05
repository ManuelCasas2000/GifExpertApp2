const { response } = require("express");
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require("../helpers/generar-jwt");


// 140
const login = async(req, res=response) => {
    const {correo, password} = req.body;

    try {

        // Verificar si el email existe

        const usuario = await Usuario.findOne({correo});
        if(!usuario) {
            return res.status(400).json({
                msg: ' usuario / pwd no son correctos - email inexistenteno existe. '
            })
        }

        // Verificar si el usuario esta activo

        if(usuario.estado === false) { // Tambien puedo poner if(!usuario.estado) {
            return res.status(400).json({
                msg: ' usuario / pwd no son correctos - estado es false. '
            })
        }

        // Verificar la contraseña

        const validPwd = bcryptjs.compareSync( password, usuario.password); // Compara el password que le paso por parámetro con el password de bbdd
        if(!validPwd) {
            return res.status(400).json({
                msg: ' usuario / pwd no son correctos - password erróneo. '
            })
        }
        // Generar el JWT 149
        const token = await generarJWT( usuario.id); // En el pilot solo grabo en usuario.id

        res.json({ // SOLO PUEDE HABER UN res.json EN TODO EL CONTROLADOR
            msg: 'Login OK',
            usuario, token
        })

    } catch(error) {
        console.log(error); // Esto no se debe mandar, lo hacemos en desarrollo
        return res.status(500).json({
            msg: 'Ha habido un error.'
        })
    }

    
}

module.exports = {
    login
}
