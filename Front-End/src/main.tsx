import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Library from "./pages/Library.tsx";
import BookTable from "./components/BookTable.tsx";
import MeetingRoomsPage from "./pages/BookingRoomsPage.tsx";
import Contact from "./pages/Contact.tsx";
import ReserveRooms from "./pages/ReservedRooms.tsx";
import ChangePass from "./pages/ChangePass.tsx";
import LibrarianPage from "./pages/ManageBooks.tsx";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext.tsx";
import { SidebarProvider } from "./context/SidebarContext.tsx";
import { NotificationProvider } from "./context/NotificationProvider.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
import { Dashboard, PageNotFound } from "./screens";
import BaseLayout from "./layout/BaseLayout.tsx";
import { useContext, useEffect } from "react";
import { DARK_THEME, LIGHT_THEME } from "./constants/themeConstants.tsx";
import dash from "./assets/sun.svg";
import random from "./assets/moon.svg";
import ManageBooks from "./pages/books-managment/addBooks.tsx";
import MagazinesLibrary from "./pages/MagazinesLibrary.tsx";
import Settings from "./pages/settings/Account.tsx";
import UserSettings from "./pages/settings/Users.tsx";
import AddBooks from "./pages/books-managment/addBooks.tsx";
import UpdateBooks from "./pages/books-managment/updateBooks.tsx";
import AdminMain from "./pages/admin/adminMain.tsx";
import AddRooms from "./pages/meeting-rooms/addRooms.tsx";
import RemoveRooms from "./pages/meeting-rooms/removeRoom.tsx";
// import UpdateRoom from "./pages/meeting-rooms/updateRooms.tsx";
import GetMaintenanceRooms from "./pages/meeting-rooms/ViewMaintenance.tsx";
import LibrarianSetting from "./pages/LibrarianSettings/Main/LibrarianSetting.tsx";
import Add from "./pages/LibrarianSettings/Add/Add.tsx";
import View from "./pages/LibrarianSettings/View/View.tsx";
import Update from "./pages/LibrarianSettings/Update/Update.tsx";
import Remove from "./pages/LibrarianSettings/Remove/Remove.tsx";
import LibraryLayout from "./layout/LibraryLayout.tsx";
import AddMagazine from "./pages/LibrarianSettings/Add/Magazine/AddMagazine.tsx";
import LibMain from "./pages/LibrarianSettings/Main/LibMain.tsx";
import BookdRequests from "./pages/Users-enrollment/EnrollUser.tsx";
import ViewLogs from "./pages/UserLogs/ViewLogs.tsx";
import BookRequests from "./pages/Users-enrollment/EnrollUser.tsx";
import ReservedRooms from "./pages/ReservedRooms.tsx";
import ReservedRoomsLib from "./pages/meeting-rooms/ReservedRooms.tsx";
import ManageStudents from "./pages/students-management/ManageStudents.tsx";
import AllStudents from "./pages/students-management/AllStudents.tsx";
import Enrolled from "./pages/students-management/EnrolledStudents.tsx";
import Unenrolled from "./pages/students-management/UnerolledStudents.tsx";
import AllRooms from "./pages/meeting-rooms/AllRooms.tsx";
import SettingsLib from "./pages/LibrarianSettings/Settings.tsx";
import AddStudents from "./pages/students-management/ManageStudents.tsx";
import AllUsers from "./pages/students-management/ViewAllUsers.tsx";
import OverDueBooks from "./pages/Users-enrollment/OverDueBooks.tsx";
import AddMagazines from "./pages/books-managment/AddMagazines.tsx";
import ViewCards from "./pages/ViewCards.tsx";
import ViewAccount from "./pages/ViewAccount.tsx";
function Root() {
  return (
    <>
      <BrowserRouter>
        <NotificationProvider />
        <ThemeProvider>
          <SidebarProvider>
            <AuthProvider>
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/signup" element={<Signup />}></Route>
                <Route path="/change-pass" element={<ChangePass />}></Route>
                <Route path="/home" element={<Home />}></Route>
                <Route
                  path="/Librarian-page"
                  element={<LibrarianPage />}
                ></Route>
                <Route
                element={<ViewAccount/>}
                path="/ViewAccount"
                ></Route>
                <Route path="/viewcards"
                element={<ViewCards></ViewCards>}
                ></Route>
                <Route path="/about" element={<About />}></Route>
                <Route path="/library" element={<Library />}></Route>
                <Route path="/magazine" element={<MagazinesLibrary />}></Route>
                <Route path="/book-table" element={<BookTable />}></Route>
                <Route
                  path="/meeting-room"
                  element={<MeetingRoomsPage />}
                ></Route>

                <Route
                  path="/reserver-rooms"
                  element={<ReserveRooms />}
                ></Route>
                <Route path="/contact" element={<Contact />}></Route>

                {/* this is for the admin */}
                <Route element={<BaseLayout />} path="/admin">
                  {/* <Route path="" element={<Dashboard />}></Route> */}
                  <Route
                    element={<AdminMain></AdminMain>}
                    path="/admin"
                  ></Route>
                  <Route
                    path="/admin/add-book-admin"
                    element={<AddBooks />}
                  ></Route>
                  <Route
                    path="/admin/update-book-admin"
                    element={<UpdateBooks />}
                  ></Route>
                  <Route
                    path="/admin/get-requests"
                    element={<BookRequests></BookRequests>}
                  ></Route>
                  <Route
                  path="/admin/due-books"
                  element={<OverDueBooks></OverDueBooks>}
                  ></Route>
                  <Route
                  path="/admin/view-books"
                  element={<View></View>}
                  ></Route>
                  <Route
                  path="/admin/add-magazine"
                  element={<AddMagazines></AddMagazines>}
                  ></Route>
                  <Route
                    path="/admin/view-logs"
                    element={<ViewLogs></ViewLogs>}
                  ></Route>
                  <Route
                    path="/admin/meeting-rooms-add"
                    element={<AddRooms />}
                  ></Route>
                  <Route
                  path="/admin/allRooms"
                  element={<AllRooms></AllRooms>}
                  ></Route>
                  <Route
                    path="/admin/meeting-rooms-remove"
                    element={<RemoveRooms />}
                  ></Route>
                  
                  <Route
                  path="/admin/manageStudents"
                  element={<AllStudents></AllStudents>}
                  >

                  </Route>
                  <Route
                  path="/admin/all-users"
                  element={<AllUsers></AllUsers>}
                  >

                  </Route>
                  <Route
                  path="/admin/add-students"
                  element={<AddStudents></AddStudents>}
                  >

                  </Route>
                  <Route
                  path="/admin/Enrolled"
                  element={<Enrolled></Enrolled>}
                  ></Route>
                  <Route
                  path="/admin/unenrolled"
                  element={<Unenrolled></Unenrolled>}
                  ></Route>
                  {/* <Route
                    path="/admin/meeting-rooms-update"
                    element={<UpdateRoom />}
                  ></Route> */}
                  <Route
                    path="/admin/getMaintenanceRooms"
                    element={<GetMaintenanceRooms></GetMaintenanceRooms>}
                  ></Route>

                  <Route
                    path="/admin/reservedRooms"
                    element={<ReservedRoomsLib></ReservedRoomsLib>}
                  ></Route>
                  <Route path="/admin/Settings" element={<Settings />}></Route>
                  <Route
                    path="/admin/manage-user"
                    element={<UserSettings />}
                  ></Route>
                  <Route path="*" element={<PageNotFound />}></Route>
                 
                </Route>

                {/* this is for the librarian */}
                <Route element={<LibraryLayout />} path="/Librarian-setting">
                  {/* <Route path="" element={<Dashboard />}></Route> */}
                  <Route
                    element={<LibMain></LibMain>}
                    path="/Librarian-setting"
                  ></Route>
                   <Route path="/Librarian-setting/Settings" element={<SettingsLib />}></Route>
                  <Route
                    path="/Librarian-setting/settings/view"
                    element={<View></View>}
                  ></Route>
                  <Route
                    path="/Librarian-setting/settings/add"
                    element={<Add></Add>}
                  ></Route>
                  <Route
                  path="/Librarian-setting/settings/view-rooms"
                  element={<AddRooms />}
                  ></Route>
                  <Route
                    path="/Librarian-setting/settings/add-magazine"
                    element={<AddMagazine></AddMagazine>}
                  ></Route>
                  <Route
                  path="/Librarian-setting/settings/view-requestedBooks"
                  element={<BookRequests></BookRequests>}
                  ></Route>
                  <Route
                    path="/Librarian-setting/settings/update"
                    element={<Update></Update>}
                  ></Route>
                  <Route
                    path="/Librarian-setting/settings/remove"
                    element={<Remove></Remove>}
                  ></Route>
                </Route>
              </Routes>
            </AuthProvider>
          </SidebarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export const CustomComponentWithButtonAndImage = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    if (theme === DARK_THEME) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);
  return (
    <>
      <button type="button" className="theme-toggle-btn" onClick={toggleTheme}>
        <img
          src={theme === LIGHT_THEME ? dash : random}
          alt=""
          className="theme-icon"
        />
      </button>
    </>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<Root />);
} else {
  console.error("Unable to find root element in the document.");
}
