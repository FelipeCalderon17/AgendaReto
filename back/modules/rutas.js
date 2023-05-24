//las rutas para resolver cada verbo de http
//Modulo que se encarga de resolver las rutas de la API REST
//Arquitectura RESTFUL
//Recordar: la API REST trabaja con los verbos HTTP
//GET, POST, PUT, DELETE, PATCH...
//Crearemos los endpoints para cada verbo

//Paquetes requeridos
const express = require("express");
const cors = require("cors"); //Para evitar restricciones entre sitio
const ruta = express.Router();
const cnn = require("./bdatos");
//middlewares requeridos
//middlewares: traductor de datos entre aplicaciones distribuidas
ruta.use(express.json()); //serializa la data en json
ruta.use(cors()); //permite acceso de otras direcciones IP distintas a mi servicio
ruta.options("*", cors()); //Configura las ip admitidas por cors, * == todas

//codificamos los verbos HTTP

//Verbo GET LISTAR
ruta.get("/api/users", (req, res) => {
  cnn.query("SELECT * FROM usuario", (error, response) => {
    if (error) {
      throw error;
    } else {
      res.send(response);
    }
  });
});

module.exports = ruta;
