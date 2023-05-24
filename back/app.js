const express = require("express");
const app = express();
app.use("/", require("./modules/rutas"));
app.use("/", require("./modules/usuario"));
app.use("/", require("./modules/contacto"));
app.use("/", require("./modules/cita"));
app.listen("4000", () => {
  console.log("Aplicacion ejecutandose en: http://localhost:4000");
});
