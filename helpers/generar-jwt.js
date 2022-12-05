
const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') => { // Como trabaja en callbacks tengo que generarme una promesa
    return new Promise((resolve, reject) => { // Tengo que devolver una promesa
        const payload = {uid}; // Aqui tambien podría grabar el nombre, edad, etc pero recordar que la información del payload se puede hackear facilmente
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '365d' // OPCIONAL: cuanto tiempo quiero que expire el JWT .. tambien puede ser p ej.  '4h' cuatro horas
        }, ( err, token ) => { // Aqui está el callback que devolverá un error o el token que tengo que resolver
            if(err) {
                console.log(err);
                reject ('No se pudo generar el JWT.');
            } else {
                resolve( token );
            }
        }) 
    })
}

module.exports = {
    generarJWT
}