// import commands from "./Components/Commands/CommandLoader.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
// import CommandRouter from "./Components/Commands/CommandRouter.js";
// import Client from "./Components/Client.js";
// import { connectToDatabase } from "./Components/Database/Database.js";

const app = express();
const webServer = http.createServer(app);
// await connectToDatabase();

const io = new Server(webServer, {
  cors: {
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected!");
  // const client = new Client(socket.id);

  socket.onAny((event, args) => {
    // if (commands[event] == undefined) {
    //   return console.error(`Command not found! ${event}`);
    // }

    // CommandRouter(commands[event], socket, client, args);
  });

  socket.on("disconnect", () => {
    // console.log(`${Client.name || socket.id} disconnected!`)
    // CommandRouter(commands["disconnect"], socket, client, {});
  });
});

webServer.listen(process.env.PORT || 4000, async () => {
  console.log(`Server is running on PORT ${process.env.PORT || 4000}...`);
});
