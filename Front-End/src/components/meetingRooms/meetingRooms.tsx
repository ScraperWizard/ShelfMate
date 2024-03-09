import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import BookModal from "../BookModal";
import './meetingRooms.scss'
function MeetingRooms({ children }: any) {
  const [activeLink, setActiveLink] = useState("add");
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  const [showModal, setShowModal] = useState(false);
  const [removeBook, setRemoveBook] = useState({
    barcode: 0,
  });


  return (
    <Fragment>
      <div
        className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto"
        data-name="settings"
      >
        <h1 className="border-b py-6 text-4xl font-semibold">
          Meeting rooms section
        </h1>
        <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
          <div className="relative my-4 w-56 sm:hidden">
            <input
              className="peer hidden"
              type="checkbox"
              name="select-1"
              id="select-1"
            />
          </div>

          <div className="col-span-2 hidden sm:block">
            <ul>
              <Link
                to="/admin/meeting-rooms-add"
                onClick={() => handleLinkClick("add")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "add" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => handleLinkClick("add")}
                >
                  Add a meeting Room
                </li>
              </Link>

              <Link
                to="/admin/allRooms"
                onClick={() => handleLinkClick("all")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "all" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => handleLinkClick("all")}
                >
                  View all meeting rooms
                </li>
              </Link>

              <Link
                to="/admin/getMaintenanceRooms"
                onClick={() => handleLinkClick("main")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "main" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => handleLinkClick("main")}
                >
                  View Maintenance Rooms
                </li>
              </Link>
              <Link
                to="/admin/reservedRooms"
                onClick={() => handleLinkClick("reserverRoom")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "reserverRoom" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => handleLinkClick("reserverRoom")}
                >
                  View reserved Rooms
                </li>
              </Link>
              {/* <Link
                to="/admin/meeting-rooms-update"
                className={`mt-5 cursor-pointer border-l-blue-700 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                  activeLink === "update" ? "text-blue-700 border-l-2" : ""
                }`}
                onClick={() => handleLinkClick("update")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "update" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => handleLinkClick("update")}
                >
                  Edit a meeting room
                </li>
              </Link> */}
              <Link
                to="/admin/meeting-rooms-remove"
                className={`mt-5 cursor-pointer border-l-blue-700 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                  activeLink === "remove" ? "text-blue-700 border-l-2" : ""
                }`}
                onClick={() => handleLinkClick("remove")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "remove" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => {
                    handleLinkClick("remove");
                    setShowModal(true);
                  }}
                >
                  Remove a meeting rom
                </li>
              </Link>
            </ul>
          </div>
          <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            {children}
          </div>
        </div>
      </div>
      
    </Fragment>
  );
}

export default MeetingRooms;
