const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
var cors = require("cors");
const path = require("path");
var bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use("/", express.static(path.join(__dirname, "../front/dist")));
app.use(cors());
app.use(express.json());
app.use(userRouter);
/*app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../front/dist", "index.html"));
});*/
module.exports = app;
