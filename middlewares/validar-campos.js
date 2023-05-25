const {response,request} = require('express');
const { validationResult } = require('express-validator');

const validar_campos = (req=request,res=response,next)=>{
    const erros = validationResult(req);
    if(!erros.isEmpty()){
        return res.status(400).json(erros)
    }

    next();

}


module.exports = {
    validar_campos
}