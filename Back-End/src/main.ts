import commands from "../Applications/Commands/Loader.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import Client from "../Components/Client/Client.js";
import CommandRouter from "../Applications/Commands/Router.js";
// import CommandRouter from "./Components/Commands/CommandRouter.js";
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
  const client = new Client(socket.id);

  socket.onAny((event, args) => {
    if (commands[event] == undefined) {
      return console.error(`Command not found! ${event}`);
    }

    // CommandRouter(commands[event], socket, client, args);
  });

  socket.on("disconnect", () => {
    console.log(`${client.getName() || socket.id} disconnected!`)
    // CommandRouter(commands["disconnect"], socket, client, {});
  });
});

webServer.listen(process.env.PORT || 4000, async () => {
  console.log(`Server is running on PORT ${process.env.PORT || 4000}...`);
});
