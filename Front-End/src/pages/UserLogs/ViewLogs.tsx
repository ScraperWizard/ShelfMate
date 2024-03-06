import { useEffect } from "react"
import socket from "../../Socket";
function ViewLogs() {
    useEffect(() => {
        socket.emit("get-logs",{});
    socket.on("logs-response", (response) => {
        console.log("This is the response from get logs", response)
    return () => {
      socket.off("logs-response");
    };
    });
    })
  return (
    <div data-name="get-requests">
      
    </div>
  )
}

export default ViewLogs

