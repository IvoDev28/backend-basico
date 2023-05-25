const {response,request} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const usuariosGet = async(req=request,res=response)=>{

    //const {user=null,pass=null,key=null} = req.query;
    const {limite = 5, desde = 0} = req.query;
    /* const usuarios = await Usuario.find({estado:true})
    .skip(Number(desde))
    .limit(Number(limite));

    const total_users = await Usuario.countDocuments({estado:true}); */
    /* 
    al tener 2 funciones async x separadas, en este caso es la misma tarea, si la obtension de usuarios demora 4 segundos
    y el total_users unos 3 segundos, tendremos un total de 7 segundos, podemos ejecutar ambas funciones asyncronas al mismo tiempo
    en este caso seria factible usarlo
    */
    // REMASTERIZANDO CODIGO
    // Con la siguiente funcion asincronica ejecutamos las 2 promesas al mismo tiempo
    // Esto nos ahorra tiempo
    /*  */
   const [total,usuarios] = await Promise.all([
    Usuario.countDocuments({estado:true}),
    Usuario.find({estado:true})
        .skip(Number(desde))
        .limit(Number(limite))
   ])

    res.json({
        total,
        usuarios
    });
}
const usuariosPut = async(req,res=response)=>{
    const {id} = req.params;
    const {_id,password,google,correo, ...resto} = req.body;
    // validar contra la base de datos

    if(password){
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password,salt);
    }

    const user = await Usuario.findByIdAndUpdate(id,resto);

    res.json(user);
}
const usuariosPost = async(req,res=response)=>{
    
    
    const {nombre, correo, password,rol} = req.body;
    const usuario = new Usuario({nombre, correo, password,rol});

    //verificar si el correo existe
    /* const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg:'El correo ya esta registrado'
        })
    } */

    //encriptar la contraseña
    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password,salt);

    //guardar en BD
    await usuario.save();
    
    res.json(usuario);
}

const usuariosDelete = async(req,res=response)=>{
    const {id} = req.params;
    
    //Borrar fisicamente de la base de datos
    //const usuario = await Usuario.findByIdAndDelete(id);
    
    //Borrar pero que el usuario permanezca en la base de datos, mas que todo para no perder informacion valiosa
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json({
        usuario
    });


}



const usuariosPatch = (req,res=response)=>{
    res.json({
        ok:true,
        msg: 'patch API - Controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}