import io from "socket.io-client"

const isProduction = process.env.NODE_ENV === 'production';
const serverURL = isProduction ? "http://217.160.159.152:4000" : "http://localhost:4000";
const socket = io(serverURL);

socket.on("connect", () => {
    console.log("Connected to server!");
    // if(localStorage.getItem("accessToken")) {
    //     console.log(localStorage.getItem("accessToken"));
    //     socket.emit("authenticate", { accessToken: localStorage.getItem("accessToken") });
    // }
})

// socket.on("disconnect", () => {
//     window.location.href = "/";
//     window.location.reload();
// })

export default socket;