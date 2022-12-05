
const { response, json } = require('express');
const jsw = require('jsonwebtoken');

const Usuario = require('../models/usuario');


const validarJWT = async(req, res = response, next) => { // next indica al que llama al middleware que puede continuar con la siguiente llamada
    // Primero debo conseguir el jwt que usualmente va en los headers. Normalmente se nombra como 'Authorization' aunque es mejor
    // darle un nombre personalizado como 'x-token' 
    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    // Ahora validamos en jwt
    try {
        //const payload = jsw.verify(token, process.env.SECRETORPRIVATEKEY); // Esta es la función que verifica el jwt
        //console.log(payload);
        // Sólo necesito el uid -> 
        const {uid} = jsw.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await Usuario.findById(uid);
        // 152 Valido que la respuesta de arriba no me de un undefined -> Es decir, no encuentra nadie por ese uid
        if(!usuario) {
            return res.status(401).json({
                msg: 'El usuario no existe en BD.'
            });
        }
        // 152 Si el usuario tiene estado = false no debería poder logearse
        if(!usuario.estado) {
            return res.status(401).json({
                msg: 'El usuario está en estado: false.'
            });
        }
        // 152 req.uid = uid;
        req.usuario = usuario;
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido en la petición'
        })

    };

    //console.log(token);
    
}

module.exports = {
    validarJWT
}