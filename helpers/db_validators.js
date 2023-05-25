const role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async(rol='')=>{
    const existerol = await role.findOne({rol});
    if(!existerol){
        throw new Error(`el rol ${rol} no esta registrado en la base de datos`);
    }
}

const emailValido = async(correo='')=>{
    
    const existeMail = await Usuario.findOne({correo});
    if(existeMail){
        throw new Error(`Este correo ${correo} ya esta registrado`);
    }
}
const existeUserPorId = async(id='')=>{
    
    const existeUser = await Usuario.findById(id);
    
    if(!existeUser){
        throw new Error(`El id ${id} no existe.`);
    }
}

/* await Usuario.findOne({correo});
if(existeEmail){
    return res.status(400).json({
        msg:'El correo ya esta registrado'
    })
} */


module.exports = {
    esRolValido,
    emailValido,
    existeUserPorId
}