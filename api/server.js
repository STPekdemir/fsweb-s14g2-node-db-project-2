const express = require("express");
const router = require("./cars/cars-router");
const server = express();

server.use(express.json());

server.use("/api/cars", router);

module.exports = server;
