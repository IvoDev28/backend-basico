const express = require('express');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.puerto = process.env.PORT;

        this.usuariosRoutePath = '/api/usuarios';
        
        //middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use(cors());
        
        //Lectura y parseo del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));
        
    }

    routes(){
        this.app.use(this.usuariosRoutePath,require('../routes/usuarios'))
        
    }


    msj_server(){
        this.app.listen(this.puerto,()=>{
            console.log('Servidor corriendo en el puerto '+this.puerto);
        })
    }
}


module.exports = Server;