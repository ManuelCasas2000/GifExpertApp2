
// const { validarCampos } = require('../middlewares/validar-campos');
// const { esAdminRole, tieneRol } = require('../middlewares/validar-roles');
// const { validarJWT } = require('../middlewares/validar-jwt');

const validaCampos = require('../middlewares/validar-campos');
const validaRoles = require('../middlewares/validar-roles');
const validaJWT = require('../middlewares/validar-jwt');

module.exports = {
    ...validaCampos, // Uso es operador Spread para exportar todo lo que tenga validaCampos
    ...validaRoles,
    ...validaJWT
}