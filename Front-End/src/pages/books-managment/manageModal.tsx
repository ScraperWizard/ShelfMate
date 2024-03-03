import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import BookModal from "../../components/BookModal";
// import './settingsModal.scss'
function manageModal({ children }: any) {
  const [activeLink, setActiveLink] = useState("");
  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };
  const [showModal, setShowModal] = useState(false);
  
  return (
    <Fragment>
      <div
        className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto"
        data-name="settings"
      >
        <h1 className="border-b py-6 text-4xl font-semibold">Books section</h1>
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
                to="/admin/add-book-admin"
                className={`mt-5 cursor-pointer border-l-blue-700 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                  activeLink === "add" ? "text-blue-700 border-l-2" : ""
                }`}
                onClick={() => handleLinkClick("add")}
              >
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "add" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => handleLinkClick("add")}
                >
                  Add a book
                </li>
              </Link>
              <Link
                to="/admin/update-book-admin"
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
                  Update a book
                </li>
              </Link>
              
                <li
                  className={`mt-5 cursor-pointer border-l-blue-700 px-2 py-2 font-semibold transition hover:border-l-blue-700 hover:text-blue-700 ${
                    activeLink === "remove" ? "text-blue-700 border-l-2" : ""
                  }`}
                  onClick={() => {
                    handleLinkClick("remove");
                    setShowModal(true);
                  }}
                >
                  Remove a book
                </li>
              
            </ul>
          </div>
          <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            {children}
          </div>
        </div>
      </div>
      <BookModal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Remove a book
          </h3>
          <form >
            <div className="mb-4">
              <label
                htmlFor="barcode"
                className="block text-gray-700 font-bold mb-2"
              >
                Barcode of the book to be removed
              </label>
              <input
                type="number"
                id="barcode"
                name="barcode"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                // onChange={handleBarCode}
              />
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Remove Book
              </button>
            </div>
          </form>
        </div>
      </BookModal>
    </Fragment>
  );
}

export default manageModal;
