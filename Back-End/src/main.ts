import commands from "../Applications/Commands/Loader.js";
import express from "express";
import http from "http";
import { Server } from "socket.io";
import Client from "../Components/Client/Client.js";
import CommandRouter from "../Applications/Commands/Router.js";
import DatabaseRouter from "../Applications/Database/Router.js";

const app = express();
const DBRouter = new DatabaseRouter();
const webServer = http.createServer(app);

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
   
    new CommandRouter(commands[event], socket, client, args, DBRouter).route();
  });

  socket.on("disconnect", () => {
    console.log(`${client.getName() || socket.id} disconnected!`)
    // CommandRouter(commands["disconnect"], socket, client, {});
  });
});

webServer.listen(process.env.PORT || 4000, async () => {
  console.log(`Server is running on PORT ${process.env.PORT || 4000}...`);
});

export function start() {}
