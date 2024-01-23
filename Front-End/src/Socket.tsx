import io from "socket.io-client"

const isProduction = process.env.NODE_ENV === 'production';
const serverURL = isProduction ? "PLACE_PRODUCTION_URL" : "http://localhost:4000";
const socket = io(serverURL);

socket.on("connect", () => {
    console.log("Connected to server!");
})

export default socket;