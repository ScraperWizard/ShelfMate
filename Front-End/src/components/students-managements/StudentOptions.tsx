import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

function StudentOptions({ children }: any) {
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  return (
    <Fragment>
      <div
        className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto"
        data-name="settings"
      >
        <h1 className="border-b py-6 text-4xl font-semibold">
          Students Management section
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
                to="/admin/manageStudents"
                onClick={() => handleLinkClick("view")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "view" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => handleLinkClick("view")}
                >
                  View all students
                </li>
              </Link>
              <Link
                to="/admin/Enrolled"
                onClick={() => handleLinkClick("enrolled")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "enrolled" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => handleLinkClick("enrolled")}
                >
                  View enrolled students
                </li>
              </Link>
              <Link
                to="/admin/unenrolled"
                onClick={() => handleLinkClick("unenrolled")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "unenrolled"
                      ? "text-blue-700 border-l-2"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("unenrolled")}
                >
                  View unenrolled students
                </li>
              </Link>
              <Link
                to="/admin/meeting-rooms-update"
                className={`mt-5 cursor-pointer border-l-blue-700 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                  activeLink === "upcoming" ? "text-blue-700 border-l-2" : ""
                }`}
                onClick={() => handleLinkClick("upcoming")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "upcoming" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => handleLinkClick("upcoming")}
                >
                  Manage upcoming students
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

export default StudentOptions;
