import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Home from "./pages/Home.tsx";
import socket from "./Socket.tsx";
import { NotificationProvider } from "./context/NotificationProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NotificationProvider />
    <Home />
  </BrowserRouter>
);
