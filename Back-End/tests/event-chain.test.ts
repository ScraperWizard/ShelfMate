import { io as ioc, type Socket as ClientSocket } from "socket.io-client";
import { Server, type Socket as ServerSocket } from "socket.io";

function waitFor(socket: ServerSocket | ClientSocket, event: string) {
  return new Promise((resolve) => {
    socket.once(event, resolve);
  });
}

describe("Event chain testing, these tests are for all commands available in the backend", () => {
  let io: Server, serverSocket: ServerSocket, clientSocket: ClientSocket;

  before((done) => {
    clientSocket = ioc(`http://localhost:4000`);
    io.on("connection", (socket) => {
      serverSocket = socket;
      done()
    });

    io.on("error", (err) => {
        throw new Error("Socket connection error: " + err.message);
    })
  });

  after(() => {
    io.close();
    clientSocket.disconnect();
  });

  it("should work", (done) => {
    serverSocket.emit("hello", "world");
  });
});
