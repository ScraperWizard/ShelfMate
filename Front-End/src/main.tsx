import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import socket from "./Socket.tsx";
import { NotificationProvider } from "./context/NotificationProvider.tsx";
import Navbar from "./components/Navbar.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <NotificationProvider />
    {/* <Routes>
      <Route path="/" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
    </Routes> */}
    <Navbar></Navbar>
  </BrowserRouter>
);
