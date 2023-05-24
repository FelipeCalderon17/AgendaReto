const express = require("express");
const app = express();
app.use("/", require("./modules/rutas"));
app.listen("4000", () => {
  console.log("Aplicacion ejecutandose en: http://localhost:4000");
});
