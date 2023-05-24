const express = require("express");
const cors = require("cors");
const usuario = express.Router();
const cnn = require("./bdatos");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const { error } = require("console");
const { CLIENT_RENEG_LIMIT } = require("tls");
usuario.use(express.json());
usuario.use(cors());
usuario.options("*", cors());

//Verbo GET LISTAR
usuario.get("/usuarios", (req, res) => {
  try {
    cnn.query("SELECT * FROM usuario", async (error, response) => {
      console.log(response);
      res.send(response);
    });
  } catch (error) {
    //throw error;
    console.log(error);
  }
});

//verbo POST INSERTAR
usuario.post("/usuarios", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 7),
    };
    cnn.query("INSERT INTO usuario set ?", data, (error, respuesta) => {
      res.send(true);
    });
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

//Login de usuario
usuario.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
      console.log("Debe enviar los datos completos");
    } else {
      cnn.query("SELECT * FROM usuario where email = ?", [email], async (error, respuesta) => {
        if (respuesta.length == 0 || !(await bcrypt.compare(password, respuesta[0].password))) {
          res.send(false);
        } else {
          res.send(true);
        }
      });
    }
  } catch (error) {
    console.log("Hay un error en la conexión con el server" + error);
  }
});

module.exports = usuario;
