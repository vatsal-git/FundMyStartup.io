const SERVER_PORT = 4000;
const SOCKET_PORT = 4001;
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { MONGODB_CONNECTION_STRING, CORS_OPTIONS } = require("./config");

//import utils
const { authenticateToken } = require("./utils/authenticateToken");

//import services
const { signup } = require("./services/signup.service");
const { signin } = require("./services/signin.service");
const {
  getUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("./services/user.service");
const {
  createStartup,
  getAllStartups,
  getAllStartupsCreatedBy,
  updateStartup,
  deleteStartup,
} = require("./services/startup.service");
const {
  createMessage,
  getUserMessages,
  deleteMessage,
} = require("./services/message.service");

//setup db
mongoose.connect(MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB connection established"));

//setup app
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors(CORS_OPTIONS));

//routes
app.post("/api/signup", signup);
app.post("/api/signin", signin);

app.get("/api/user", authenticateToken, getUser);
app.get("/api/user/:id", getUserById);
app.put("/api/user", authenticateToken, updateUser);
app.delete("/api/user", authenticateToken, deleteUser);

app.post("/api/startup", authenticateToken, createStartup);
app.get("/api/startups", getAllStartups);
app.get("/api/startups/:userId", getAllStartupsCreatedBy);
app.put("/api/startup/:id", authenticateToken, updateStartup);
app.delete("/api/startup/:id", authenticateToken, deleteStartup);

app.get("/api/messages", authenticateToken, getUserMessages);

app.listen(SERVER_PORT, () =>
  console.log("Server is listening on Port: " + SERVER_PORT)
);

//setup socket
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: CORS_OPTIONS,
});

//socket events
io.on("connection", (socket) => {
  console.log("New client connected to socket...");
  socket.on("message", (params) => createMessage(io, params));
  socket.on("deleteMessage", (params) => deleteMessage(io, params));
  socket.on("disconnect", () =>
    console.log("Client disconnected from socket...")
  );
});

server.listen(SOCKET_PORT, () =>
  console.log(`Socket is listening on Port: ${SOCKET_PORT}`)
);
