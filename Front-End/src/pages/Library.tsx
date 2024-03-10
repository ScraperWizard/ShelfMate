import Navbar from "../components/Navbar";
import "../styles/Library.css";
import socket from "../Socket";
import { useState, useEffect, Fragment } from "react";
import { useAuth } from "../context/AuthProvider";
import BookModal from "../components/BookModal";

type Book = {
  id: number;
  image: string;
  genre: string;
  title: string;
  copies: number;
  author: string;
  barcode: number;
  language: string;
  year_of_prod: number;
  publisher: string;
  subjects: string;
  price: number;
};

function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { accessToken } = useAuth();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const handleView = (book: Book) => {
    socket.emit("view-book", { bookId: book.barcode });
    setSelectedBook(book);
    setShowModal(true);
  };
  useEffect(() => {
    socket.emit("get-library-books");

    socket.on("library-books-response", (response: Book[]) => {
      setBooks(response);
      console.log("This is the response from library-books-response", response)
    });

    return () => {
      socket.off("library-books-response");
    };
  }, []);

  const handleBorrow = (id: number) => { 
    socket.emit("request-item", {bookId : id});
    socket.on("request-item-response", (response) => {
      socket.emit("get-library-books");

    socket.on("library-books-response", (response: Book[]) => {
      setBooks(response);
      console.log("This is the response from library-books-response", response)
    });

    return () => {
      socket.off("library-books-response");
    };
      console.log("This is the response from request-item-response", response)
    });
  }

  return (
    <Fragment>
      <div className="library" data-name="library">
        <Navbar></Navbar>
        <h1>Library</h1>
        <div className="libraryBox">
          {/* this is where I will loop through each book  */}
          {books.length > 0 &&
            books.map((book) => (
              <div className="libraryCards" key={book.id}>
                <div className="libraryImage">
                  <img src={book.image} className="Image" alt={book.title} onClick={() =>handleView(book)} />
                </div>
                <div className="libraryTag">
                  <p>{book.title}</p>
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
                      handleBorrow(book.barcode);
                    }}
                  >
                    Borrow
                  </a>
                </div>
              </div>
            ))}

          {/* this is like a placeholder done by yaman I will remove it as soon as I make sure that everything works right */}
        </div>
      </div>
      <BookModal isVisible={showModal} onClose={() => setShowModal(false)}>
          {selectedBook && ( 
          <div
            className="p-6"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Book Info
            </h3>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <p>{selectedBook.title}</p>
            </div>
            {/* author */}

            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-gray-700 font-bold mb-2"
              >
                Author
              </label>
              <p>{selectedBook.author}</p>
            </div>

            {/* language */}
            <div className="mb-4">
              <label
                htmlFor="language"
                className="block text-gray-700 font-bold mb-2"
              >
                Language
              </label>
              <p>{selectedBook.language}</p>
            </div>

            {/* year_of_prod */}

            <div className="mb-4">
              <label
                htmlFor="year_of_prod"
                className="block text-gray-700 font-bold mb-2"
              >
                Year of production
              </label>
              <p>{selectedBook.year_of_prod}</p>
            </div>

            {/* publisher */}

            <div className="mb-4">
              <label
                htmlFor="publisher"
                className="block text-gray-700 font-bold mb-2"
              >
                Publisher
              </label>
              <p>{selectedBook.publisher}</p>
            </div>

            {/* subjects */}

            <div className="mb-4">
              <label
                htmlFor="subjects"
                className="block text-gray-700 font-bold mb-2"
              >
                Subjects
              </label>
              <p>{selectedBook.subjects}</p>
            </div>

            {/* no_of_pages */}

            {/* price */}

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price
              </label>
              <p>{selectedBook.price}</p>
            </div>

          </div>
          )}
        </BookModal>
    </Fragment>
  );
}

export default Library;
