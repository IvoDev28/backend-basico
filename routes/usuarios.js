const {Router} = require('express');
const {check} = require('express-validator')
const { 
    usuariosGet, 
    usuariosPut, 
    usuariosPost, 
    usuariosDelete, 
    usuariosPatch } = require('../Controllers/user.controller');

const { validar_campos } = require('../middlewares/validar-campos');
const { esRolValido, emailValido,existeUserPorId } = require('../helpers/db_validators');
const router = Router();



router.get('/',usuariosGet);

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUserPorId),
    check('rol').custom( rol => esRolValido(rol) ),
    validar_campos

],usuariosPut);

router.post('/',[
    //check('correo','El correo no es valido').isEmail(),
    check('correo').custom(mail=> emailValido(mail)).isEmail(),
    check('nombre','El nombre es obligatorop').not().isEmpty(),
    check('password','El passaword debe ser mas de 6 letras').isLength({min:6}),   
    //check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //como es solo un valor a chequear, podemos pasar de rol => esRolValido(rol) a solamente esRolValido  
    check('rol').custom( rol => esRolValido(rol) ),
    validar_campos,
],usuariosPost);

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(existeUserPorId),
    validar_campos
],usuariosDelete);

router.patch('/',usuariosPatch);

module.exports = router;