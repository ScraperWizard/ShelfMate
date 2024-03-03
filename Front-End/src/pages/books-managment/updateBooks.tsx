import React from "react";
import ManageModal from "./manageModal";

function UpdateBooks() {
  return (
    <ManageModal>
      <div className="pt-4" data-name="update-book-admin">
        <h1 className="py-2 text-2xl font-semibold">
          Book management settings
        </h1>
      </div>
      <div
            className="p-6"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Update a book
            </h3>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>
              {/* author */}

              <div className="mb-4">
                <label
                  htmlFor="author"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>

              {/* language */}
              <div className="mb-4">
                <label
                  htmlFor="language"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>

              {/* year_of_prod */}

              <div className="mb-4">
                <label
                  htmlFor="year_of_prod"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Year of production
                </label>
                <input
                  type="number"
                  id="year_of_prod"
                  name="year_of_prod"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>

              {/* publisher */}

              <div className="mb-4">
                <label
                  htmlFor="publisher"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Publisher
                </label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>

              {/* subjects */}

              <div className="mb-4">
                <label
                  htmlFor="subjects"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Subjects
                </label>
                <input
                  type="text"
                  id="subjects"
                  name="subjects"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>

              {/* no_of_pages */}

              <div className="mb-4">
                <label
                  htmlFor="no_of_pages"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Number of pages
                </label>
                <input
                  type="number"
                  id="no_of_pages"
                  name="no_of_pages"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>

              {/* price */}

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>

              {/* rack */}

              <div className="mb-4">
                <label
                  htmlFor="rack"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Rack
                </label>
                <input
                  type="number"
                  id="rack"
                  name="rack"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>

              {/* image */}

              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Image
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>

              {/* isbn */}
              <div className="mb-4">
                <label
                  htmlFor="isbn"
                  className="block text-gray-700 font-bold mb-2"
                >
                  ISBN
                </label>
                <input
                  type="text"
                  id="isbn"
                  name="isbn"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  // onChange={handleUpdate}
                />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
    </ManageModal>
  );
}

export default UpdateBooks;
