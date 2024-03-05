import { useEffect, useState } from "react";
import SettingsModal from "../../../components/LibrarianPanel/settings/SettingsModal";
import socket from "../../../Socket";
import BookModal from "../../../components/BookModal";
import UpdateBook from "./UpdateBook";


export default function Update() {
  console.log("Update function entered")
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
    isbn: string;
    no_of_pages: number;
    rack: number;
  };

  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    socket.emit("get-library-books");
  
    socket.on("library-books-response", (response: Book[] | any) => {
      console.log("Response from library-books-response", response)
      if (Array.isArray(response)) {
        setBooks(response);
        console.log(response);
      } else {
        console.error("Response is not an array:", response);
      }
    });
  
    return () => {
      socket.off("library-books-response");
    };
  }, []);

  const handleView = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SettingsModal data-name="update">
      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        />
      </div>
      <div className="libraryBox grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              className="libraryCards bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out transform hover:scale-105"
              key={book.id}
            >
              <div className="libraryImage relative">
                <img src={book.image} className="Image" alt={book.title} />
              </div>
              <div className="libraryTag flex flex-col justify-center items-center mt-2">
                <p className="text-xl font-semibold text-center">
                  {book.title}
                </p>
                <p className="text-sm text-gray-500">{book.genre}</p>
                <div className="libraryIcons mt-2">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star-half-stroke"></i>
                </div>
                <a
                  href="#"
                  className="borrowBtn mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-transform duration-300 ease-in-out transform hover:scale-105"
                  onClick={(e) => {
                    e.preventDefault();
                    handleView(book);
                  }}
                >
                  Update
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
      {/* <ViewBook isVisible={showModal} onClose={() => setShowModal(false)} selectedBook={selectedBook}></ViewBook> */}
      <UpdateBook isVisible={showModal} onClose={() => setShowModal(false)} selectedBook={selectedBook}></UpdateBook>
    </SettingsModal>
  );
}
