const PORT = 4000;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//setup app
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

//setup db
mongoose.connect("mongodb://127.0.0.1:27017/fund-my-startup-db", {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//import utils
const { authenticateToken } = require("./utils/authenticateToken");

//import services
const { signup } = require("./services/signup.service");
const { signin } = require("./services/signin.service");
const { getUser, updateUser, deleteUser } = require("./services/user.service");
const {
  createStartup,
  getAllStartups,
  getStartup,
  updateStartup,
  deleteStartup,
} = require("./services/startup.service");

//routes
app.post("/api/signup", signup);
app.post("/api/signin", signin);

app.get("/api/user", authenticateToken, getUser);
app.put("/api/user/:id", authenticateToken, updateUser);
app.delete("/api/user/:id", authenticateToken, deleteUser);

app.post("/api/startup", authenticateToken, createStartup);
app.get("/api/startups", getAllStartups);
app.get("/api/startup/:id", getStartup);
app.put("/api/startup/:id", authenticateToken, updateStartup);
app.delete("/api/startup/:id", authenticateToken, deleteStartup);

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
