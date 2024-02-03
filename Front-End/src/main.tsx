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
import { AuthProvider } from "./context/AuthProvider.tsx";

// import './styles/About.css'
// import './styles/Library.css'
// import './styles/Home.css'
// import './styles/myBooks.css'
//meeting-room
import About from "./pages/About.tsx";
import Library from "./pages/Library.tsx";
import BookTable from "./components/BookTable.tsx";
import MeetingRoomsPage from "./pages/MeetingRoomsPage.tsx";
import Contact from "./pages/Contact.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AuthProvider>
      <NotificationProvider />
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/library" element={<Library></Library>}></Route>
        <Route path="/book-table" element={<BookTable></BookTable>}></Route>
        <Route path="/meeting-room" element={<MeetingRoomsPage></MeetingRoomsPage>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
      </Routes>
      {/* <MeetingRoomsPage></MeetingRoomsPage> */}
    </AuthProvider>
  </BrowserRouter>
);
