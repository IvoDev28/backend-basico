const mongoose = require('mongoose');

const dbconecction = async()=>{
    try {
        await mongoose.connect( process.env.MONGODB_ATLAS );

        console.log('Base de datos online')
    
    } catch (error) {

        throw new Error('Error en la iniciacion de la base de datos');
    
    }

}




module.exports = dbconecction;