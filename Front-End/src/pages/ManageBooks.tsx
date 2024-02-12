import Navbar from "../components/Navbar";
import arrivalImg1 from "../assets/arrival_1.jpg";
import arrivalImg2 from "../assets/arrival_2.jpg";
import arrivalImg3 from "../assets/arrival_3.jpg";
import arrivalImg4 from "../assets/arrival_4.jpg";
import arrivalImg5 from "../assets/arrival_5.jpg";
import arrivalImg6 from "../assets/arrival_6.jpg";
import arrivalImg7 from "../assets/arrival_7.jpg";
import arrivalImg8 from "../assets/arrival_8.webp";
import arrivalImg9 from "../assets/arrival_9.jpg";
import arrivalImg10 from "../assets/arrival_10.jpg";
import bookImg9 from "../assets/book_9.jpg";
import bookImg10 from "../assets/book_10.png";
import bookImg11 from "../assets/book_11.jpg";
import bookImg12 from "../assets/book_12.png";
import bookImg13 from "../assets/book_13.png";
import bookImg14 from "../assets/book_14.png";
import bookImg15 from "../assets/book_15.png";
import "../styles/Library.css";
import socket from "../Socket";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import BookModal from "../components/BookModal";
import { Link } from "react-router-dom";
import { Fragment } from "react";
type Book = {
  id: number;
  image: string;
  genre: string;
  title: string;
  copies: number;
};

function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const { accessToken } = useAuth();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  useEffect(() => {
    socket.emit("getBooks");

    socket.on("booksData", (message) => {
      const filteredBooks = message.map((book: Book) => ({
        id: book.id,
        image: book.image,
        genre: book.genre,
        title: book.title,
        copies: book.copies,
      }));

      setBooks(filteredBooks);
    });

    return () => {
      socket.off("booksData");
    };
  }, []);

  const handleBorrow = (bookId: number) => {
    // Handle borrowing a book
    console.log("Borrow Book clicked", bookId);
  };

  const handleView = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  return (
    <>
      <Fragment>
        <Navbar></Navbar>
        <div className="library" data-name="Librarian-page">
          =<h1>Library</h1>
          <div className="mb-4 flex justify-center">
            <button
              className="mr-4 bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal(true)}
            >
              Add a new book
            </button>
            <button
              className="mr-4  bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal2(true)}
            >
              Remove a book
            </button>
            <button
              className="mr-4  bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal3(true)}
            >
              Update a book
            </button>
          </div>
          <div className="libraryBox">
            {/* this is where I will loop through each book  */}

            {books.length > 0 &&
              books.map((book) => (
                <div className="libraryCards" key={book.id}>
                  <div className="libraryImage">
                    <img src={book.image} className="Image" alt={book.title} />
                  </div>
                  <div className="libraryTag">
                    <p>{book.genre}</p>
                    <div className="libraryIcons">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star-half-stroke"></i>
                    </div>
                    <a
                      href="#"
                      className="borrowBtn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleView(book);
                      }}
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}

            {/* this is like a placeholder done by yaman I will remove it as soon as I make sure that everything works right */}

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={arrivalImg1} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Romance, Mystery</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={arrivalImg2} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Action</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={arrivalImg3} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Police Novel</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={arrivalImg4} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Adventure</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={arrivalImg5} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Comedy</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={arrivalImg6} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Magic, Adult</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={arrivalImg7} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Science and Nature</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={arrivalImg8} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Cartoon</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={arrivalImg9} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Philosophy</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={arrivalImg10} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Science Fiction</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={bookImg9} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Action, Mystery</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={bookImg10} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Business & Finance</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={bookImg11} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Drama</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={bookImg12} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Business and Wellness</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={bookImg13} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Mindfulness</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={bookImg14} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Kids</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>

            <div className="libraryCards">
              <div className="libraryImage">
                <img src={bookImg15} className="Image" />
              </div>
              <div className="libraryTag">
                <p>Law</p>
                <div className="libraryIcons">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a href="#" className="borrowBtn">
                  View
                </a>
              </div>
            </div>
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
    </>
  );
}

export default Library;
