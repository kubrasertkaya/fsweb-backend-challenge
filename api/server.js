// 1.importlarım

const express = require("express");
const server = express();
require("dotenv").config();

// 2.global middleware'larım

// 3.routerlarım
server.get("/", (req, res) => {
  res.json({ message: "Server up and running...." }); //test amaçlı bir endpoint yazdık.
});

// 4.ERROR middleware

// 5.export

module.exports = server;
