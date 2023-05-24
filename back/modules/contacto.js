const express = require("express");
const cors = require("cors");
const contacto = express.Router();
const cnn = require("./bdatos");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const { error } = require("console");
const { CLIENT_RENEG_LIMIT } = require("tls");
contacto.use(express.json());
contacto.use(cors());
contacto.options("*", cors());

//Verbo GET LISTAR
contacto.get("/contactos", (req, res) => {
  try {
    cnn.query("SELECT * FROM contacto", async (error, response) => {
      console.log(response);
      res.send(response);
    });
  } catch (error) {
    //throw error;
    console.log(error);
  }
});

//verbo POST INSERTAR
contacto.post("/contactos", async (req, res) => {
  try {
    let data = {
      nombre: req.body.nombre,
      apellido1: req.body.apellido1,
      apellido2: req.body.apellido2,
      telefono: req.body.telefono,
      email: req.body.email,
      fechaNacimiento: req.body.fechaNacimiento,
    };
    cnn.query("INSERT INTO contacto set ?", data, (error, respuesta) => {
      res.send(true);
    });
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

//verbo PUT ACTUALIZAR
contacto.put("/contactos/:id", (req, res) => {
  let id = req.params.id;
  let data = {
    nombre: req.body.nombre,
    apellido1: req.body.apellido1,
    apellido2: req.body.apellido2,
    telefono: req.body.telefono,
    email: req.body.email,
    fechaNacimiento: req.body.fechaNacimiento,
  };
  cnn.query("UPDATE contacto SET ? where id = ?", [data, id], (error, respuesta) => {
    if (error) {
      console.log(error);
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

//verbo DELETE BORRAR
contacto.delete("/contactos/:id", (req, res) => {
  let id = req.params.id;
  cnn.query("delete from contacto where id = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
        res.send(false);
      } else {
        res.send(true);
      }
    };
});

module.exports = contacto;
