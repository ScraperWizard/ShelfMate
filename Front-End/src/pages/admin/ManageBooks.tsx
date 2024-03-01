import BookModal from "../../components/BookModal"
import { Fragment, useState } from "react";
import './admin.scss'
import Dashboard from "../../screens/dashboard/DashboardScreen";
function ManageBooks() {
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  return (
    <Fragment data-name="manage-books">
    
    <div>
        <div className="mb-4 flex justify-center">
            <button
              className="mr-4  hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal(true)}
            >
              Add a new book
            </button>
            <button
              className="mr-4   hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal2(true)}
            >
              Remove a book
            </button>
            <button
              className="mr-4   hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal3(true)}
            >
              Update a book
            </button>
          </div>
    </div>
    <BookModal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Add New Book
          </h3>
          <form >
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                // value={bookInfo.title}
                // onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                // value={bookInfo.date}
                // onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="details" className="block text-gray-700 font-bold mb-2">Details</label>
              <textarea
                id="details"
                name="details"
                // value={bookInfo.details}
                // onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
              <select
                id="status"
                name="status"
                // value={bookInfo.status}
                // onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Borrow">Borrow</option>
                <option value="Return">Return</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="capacity" className="block text-gray-700 font-bold mb-2">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                // value={bookInfo.capacity}
                // onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Book</button>
            </div>
          </form>
        </div>


        </BookModal>

        <BookModal isVisible={showModal2} onClose={() => setShowModal2(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Remove a book
          </h3>
          <form >
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title of the book to be removed</label>
              <input
                type="text"
                id="title"
                name="title"
                // value={removeBookInfo.title}
                // onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Remove Book</button>
            </div>
          </form>
        </div>
        </BookModal>
        <BookModal isVisible={showModal3} onClose={() => setShowModal3(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Update a book
          </h3>
          <form >
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                // value={updateBookInfo.date}
                // onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="details" className="block text-gray-700 font-bold mb-2">Details</label>
              <textarea
                id="details"
                name="details"
                // value={updateBookInfo.details}
                // onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
              <select
                id="status"
                name="status"
                // value={updateBookInfo.status}
                // onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Borrow">Borrow</option>
                <option value="Return">Return</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="capacity" className="block text-gray-700 font-bold mb-2">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                // value={updateBookInfo.capacity}
                // onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Book</button>
            </div>
          </form>
        </div>
        </BookModal>
    </Fragment>
  )
}

export default ManageBooks
