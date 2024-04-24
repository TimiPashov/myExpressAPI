const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
module.exports = (app) => {
  app.use("/static", express.static("static"));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "http://localhost:4200",
      credentials: true,
    })
  );
};
