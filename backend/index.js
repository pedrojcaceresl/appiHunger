// Importing the dependencies
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const PORT = process.env.PORT;
const io = new Server();

const swaggerDocs = require("./src/helpers/swagger.js");

// Defining Expresss app
const app = express();

// Using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     limit: "50mb",
//     extended: false,
//   })
// );

// Enable CORS for all requests
app.use(
  cors({
    origin: "*",
  })
);

// Endpoints
require("./src/routes/usuarios.routes")(app);
require("./src/routes/pedidos.routes")(app);
require("./src/routes/categorias.routes")(app);
require("./src/routes/producto.routes")(app);
require("./src/routes/comprobante.routes")(app);
require("./src/routes/pedidos.routes")(app);
require("./src/routes/formaPagos.routes")(app);

// Socket server event
io.on("connection", (socket) => {
  console.log(`A user with ${socket.id} is connected`);
});

// Starting the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}}`);
  swaggerDocs(app, PORT);
});

module.exports = app;
