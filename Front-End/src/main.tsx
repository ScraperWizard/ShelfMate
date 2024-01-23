import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import socket from './Socket.tsx'
console.log(socket)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>
);
