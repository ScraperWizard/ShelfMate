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
  type: string;
  no_of_pages: number;
  isbn: string;
  rack: number;
  editor: string;
  edition_num: number;
  quantity: number;
};

function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const { accessToken } = useAuth();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  // const handleView = (book: Book) => {
  //   socket.emit("view-book", { bookId: book.barcode });
  //   setSelectedBook(book);
  //   setShowModal(true);
  // };
  useEffect(() => {
    socket.emit("get-library-books", {query: searchQuery});

    console.log("This is the value of q", { query: searchQuery });
    socket.on("library-books-response", (response: Book[]) => {
      setBooks(response);
      console.log("This is the response from library-books-response", response);
    });

    return () => {
      socket.off("library-books-response");
    };
  }, [searchQuery]);

  const handleBorrow = (id: number) => {
    socket.emit("request-item", { bookId: id });
    socket.on("request-item-response", (response) => {
      socket.emit("get-library-books");

      socket.on("library-books-response", (response: Book[]) => {
        setBooks(response);
        console.log(
          "This is the response from library-books-response",
          response
        );
      });

      return () => {
        socket.off("library-books-response");
      };
      console.log("This is the response from request-item-response", response);
    });
  };

  const handleViewItem = (id: number) => {
    socket.emit("get-all-info", { barcode: id });
    socket.on("get-all-info-response", (message) => {
      console.log("get-all-info-response", message);
      setSelectedBook(message);
      setShowModal(true);
    });
  };

  return (
    <Fragment>
      <div className="library" data-name="library">
        <Navbar></Navbar>
        <h1>Library</h1>
        <div className="flex justify-center mb-4">
  <div className="w-full max-w-lg">
    {/* Search Bar */}
    <input
      type="text"
      placeholder="Search by anything..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>
</div>
        <div className="libraryBox">
          {/* this is where I will loop through each book  */}
          {books.length > 0 &&
            books.map((book) => (
              <div className="libraryCards" key={book.id}>
                <div className="libraryImage">
                  <img
                    src={book.image}
                    className="Image"
                    alt={book.title}
                    onClick={() => handleViewItem(book.barcode)}
                  />
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

       
        </div>
      </div>
      <BookModal isVisible={showModal} onClose={() => setShowModal(false)}>
        {selectedBook && (
          <div
            className="p-6"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Item Info
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

            <div className="mb-4">
              <label
                htmlFor="barcode"
                className="block text-gray-700 font-bold mb-2"
              >
                Barcode
              </label>
              <p>{selectedBook.barcode}</p>
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
            <div className="mb-4">
              <label
                htmlFor="no_of_pages"
                className="block text-gray-700 font-bold mb-2"
              >
                Number of pages
              </label>
              <p>{selectedBook.no_of_pages}</p>
            </div>
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

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Quantity
              </label>
              <p>{selectedBook.quantity}</p>
            </div>

            {selectedBook.type === "book" ? (
              <div className="mb-4">
                <label
                  htmlFor="isbn"
                  className="block text-gray-700 font-bold mb-2"
                >
                  ISBN
                </label>
                <p>{selectedBook.isbn}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                htmlFor="rack"
                className="block text-gray-700 font-bold mb-2"
              >
                Rack
              </label>
              <p>{selectedBook.rack}</p>
            </div>

            {selectedBook.type === "magazine" ? (
              <div className="mb-4">
                <label
                  htmlFor="isbn"
                  className="block text-gray-700 font-bold mb-2"
                >
                  editor
                </label>
                <p>{selectedBook.editor}</p>
              </div>
            ) : null}

            {selectedBook.type === "magazine" ? (
              <div className="mb-4">
                <label
                  htmlFor="isbn"
                  className="block text-gray-700 font-bold mb-2"
                >
                  edition_num
                </label>
                <p>{selectedBook.edition_num}</p>
              </div>
            ) : null}
          </div>
        )}
      </BookModal>
    </Fragment>
  );
}

export default Library;
