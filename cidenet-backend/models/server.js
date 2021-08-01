const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            empleados: '/api/empleados',
            paises: '/api/paises',
            tipo_identificaciones: '/api/tipoidentificaciones'
        };

        // Conectar a base de datos
        this.conectarDB();

        // Mddlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        // Lectura y Parseo del Body
        this.app.use(express.json());

        // Directorio publico
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.empleados, require('../routes/empleados'));
        this.app.use(this.paths.paises, require('../routes/paises'));
        this.app.use(
            this.paths.tipo_identificaciones,
            require('../routes/tipo_identificaciones')
        );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;
