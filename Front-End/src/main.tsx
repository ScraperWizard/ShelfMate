
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";

import { NotificationProvider } from "./context/NotificationProvider.tsx";

import { AuthProvider } from "./context/AuthProvider.tsx";

// import './styles/About.css'
// import './styles/Library.css'
// import './styles/Home.css'
// import './styles/myBooks.css'
//meeting-room
import About from "./pages/About.tsx";
import Library from "./pages/Library.tsx";
import BookTable from "./components/BookTable.tsx";
import MeetingRoomsPage from "./pages/BookingRoomsPage.tsx";
import Contact from "./pages/Contact.tsx";
import ReserveRooms from "./pages/ReservedRooms.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  
  <BrowserRouter>
    
      <NotificationProvider />
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/library" element={<Library></Library>}></Route>
        <Route path="/book-table" element={<BookTable></BookTable>}></Route>
        <Route path="/meeting-room" element={<MeetingRoomsPage></MeetingRoomsPage>}></Route>
        <Route path="/reserver-rooms" element={<ReserveRooms></ReserveRooms>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
      </Routes>
      </AuthProvider>
 
   
  </BrowserRouter>
  
);
