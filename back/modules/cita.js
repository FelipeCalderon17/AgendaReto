const express = require("express");
const cors = require("cors");
const cita = express.Router();
const cnn = require("./bdatos");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const { error } = require("console");
const { CLIENT_RENEG_LIMIT } = require("tls");
cita.use(express.json());
cita.use(cors());
cita.options("*", cors());

//Verbo GET LISTAR
cita.get("/citas", (req, res) => {
  try {
    cnn.query("SELECT * FROM cita", async (error, response) => {
      console.log(response);
      res.send(response);
    });
  } catch (error) {
    //throw error;
    console.log(error);
  }
});

//verbo POST INSERTAR
cita.post("/citas", async (req, res) => {
  try {
    let data = {
      fecha: req.body.fecha,
      descripcion: req.body.descripcion,
    };
    cnn.query("INSERT INTO cita set ?", data, (error, respuesta) => {
      res.send(true);
    });
  } catch (error) {
    console.log(error);
    res.send(false);
  }
});

//verbo PUT ACTUALIZAR
cita.put("/citas/:id", (req, res) => {
  let id = req.params.id;
  let data = {
    fecha: req.body.fecha,
    descripcion: req.body.descripcion,
  };
  cnn.query("UPDATE cita SET ? where id = ?", [data, id], (error, respuesta) => {
    if (error) {
      console.log(error);
      res.send(false);
    } else {
      res.send(true);
    }
  });
});

//verbo DELETE BORRAR
cita.delete("/citas/:id", (req, res) => {
  let id = req.params.id;
  cnn.query("delete from cita where id = ?", id),
    (error, respuesta) => {
      if (error) {
        console.log(error);
        res.send(false);
      } else {
        res.send("200");
      }
    };
});

module.exports = cita;
