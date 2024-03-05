import { useState } from "react";
import { Link } from "react-router-dom";

function SettingsOptions() {
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  return (
    <div className="col-span-2 hidden sm:block">
      <ul>
        <Link
          to="/library/settings/view"
          className={`mt-5 cursor-pointer border-l-blue-700 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
            activeLink === "viewBooks" ? "text-blue-700 border-l-2" : ""
          }`}
          onClick={() => handleLinkClick("viewBooks")}
        >
          <li
            className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
              activeLink === "viewBooks" ? "text-blue-700 border-l-2" : ""
            }`}
            onClick={() => handleLinkClick("viewBooks")}
          >
            View Books
          </li>
        </Link>
        <Link
          to="/library/settings/add"
          className={`mt-5 cursor-pointer border-l-blue-700 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
            activeLink === "addBooks" ? "text-blue-700 border-l-2" : ""
          }`}
          onClick={() => handleLinkClick("addBooks")}
        >
          <li
            className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
              activeLink === "addBooks" ? "text-blue-700 border-l-2" : ""
            }`}
            onClick={() => handleLinkClick("addBooks")}
          >
            Add Books
          </li>
        </Link>
        <Link
          to="/library/settings/update"
          className={`mt-5 cursor-pointer border-l-blue-700 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
            activeLink === "updateBooks" ? "text-blue-700 border-l-2" : ""
          }`}
          onClick={() => handleLinkClick("updateBooks")}
        >
          <li
            className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
              activeLink === "updateBooks" ? "text-blue-700 border-l-2" : ""
            }`}
            onClick={() => handleLinkClick("updateBooks")}
          >
            Update Books
          </li>
        </Link>
        <Link
          to="/library/settings/remove"
          className={`mt-5 cursor-pointer border-l-blue-700 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
            activeLink === "removeBooks" ? "text-blue-700 border-l-2" : ""
          }`}
          onClick={() => handleLinkClick("removeBooks")}
        >
          <li
            className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
              activeLink === "removeBooks" ? "text-blue-700 border-l-2" : ""
            }`}
            onClick={() => handleLinkClick("removeBooks")}
          >
            Remove Books
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default SettingsOptions;
