// 1.importlarım

const express = require("express");
const server = express();
require("dotenv").config();
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");

// 2.global middleware'larım
server.use(helmet());
server.use(cors());
server.use(morgan("dev"));

// 3.routerlarım
server.get("/", (req, res) => {
  res.json({ message: "Server up and running...." }); //test amaçlı bir endpoint yazdık.
});

// 4.ERROR middleware

// 5.export

module.exports = server;
