const express = require('express');
const cors = require('cors');
const routes = require('../routes/usuarios');
const dbconecction = require('../DATABASE/config');

class Server{
    constructor(){
        this.app = express();
        this.puerto = process.env.PORT||8080;

        this.usuariosRoutePath = '/api/usuarios';
        //conectar a la base de datos
        this.conectarbd();
        
        //middlewares
        this.middlewares();

        //rutas de mi aplicacion
        this.routes();

    }
    async conectarbd(){
        await dbconecction();
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
        this.app.use(this.usuariosRoutePath,routes)
        
    }


    msj_server(){
        this.app.listen(this.puerto,()=>{
            console.log('Servidor corriendo en el puerto '+this.puerto);
        })
    }
}


module.exports = Server;
