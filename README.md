## Instalacion de paquetes node

Para el backend (Node JS)

En el directorio cidenet-backend ejecutar el siguiente comando: 

    npm install


Para el frontend (React JS)

En el directorio cidenet-frontend ejecutar el siguiente comando: 

    npm install

### Ejecucion del proyecto

Para el backend (Node JS)

En el directorio cidenet-backend ejecutar el siguiente comando: 

    node app

    Esto desplegara la aplicacion del backend en http://localhos:8080


Para el frontend (React JS)

En el directorio cidenet-frontend ejecutar el siguiente comando: 

    npm start


    Esto desplegara la aplicacion en http://localhos:3000


### Base de datos

La base de datos esta basada en MongoDB en una instancia publicada en linea para que este accesible a la aplicacion desde cualquier lugar

Se crearon las siguintes colecciones para almacenamiento de datos: 

empleados({
    primer_apellido: {
        type: String
    },
    segundo_apellido: {
        type: String
    },
    primer_nombre: {
        type: String
    },
    otros_nombres: {
        type: String
    },
    pais: {
        type: String
    },
    tipo_identificacion: {
        type: String
    },
    identificacion: {
        type: String
    },
    correo: {
        type: String
    }
});


paises({
    id: {
        type: Number
    },
    nombre: {
        type: String
    }
});


tipo_identificaciones({
    id: {
        type: Number
    },
    nombre: {
        type: String
    }
});

