import Navbar from "../components/Navbar";
import "../styles/myBooks.css";
import socket from "../Socket";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

type Book = {
  author: string;
  barcode: number;
  borrower: number;
  image: string;
  language: string;
  no_of_pages: number;
  price: number;
  publisher: string;
  rack: number;
  subjects: string;
  title: string;
  type: string;
  year_of_prod: number;
};
function BookTable() {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[] | null>(null);
  const { accessToken } = useAuth();
  useEffect(() => {
    if (accessToken) {
      socket.emit("get-borrowed-books", {});

      socket.on("get-borrowed-books-response", (response) => {
        setBorrowedBooks(response);
        console.log(
          "This is the response from borrowed-books-response",
          response
        );
      });

      return () => {
        socket.off("borrowed-books-response");
      };
    }
  }, [accessToken]);

  const handleReturnBook = (bookId: number) => {
    socket.emit("return-book", { bookId: bookId });
    socket.on("return-book-response", (response) => {
      socket.emit("get-borrowed-books", {});
      socket.on("get-borrowed-books-response", (response) => {
        console.log("book with the barcode", bookId, "is returned");
      });
      return () => {
        socket.off("borrowed-books-response");
      };
    });
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="libraryBox grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {borrowedBooks && borrowedBooks.length > 0 ? (
          borrowedBooks.map((book) => (
            <div
              className="libraryCards bg-white rounded-lg shadow-lg p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out transform hover:scale-105"
              key={book.author}
            >
              <div className="libraryImage relative">
                <img src={book.image} className="Image" alt={book.title} />
              </div>
              <div className="libraryTag flex flex-col justify-center items-center mt-2">
                <p className="text-xl font-semibold text-center">
                  {book.title}
                </p>
                <p className="text-sm text-gray-500">{book.subjects}</p>
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
                  onClick={() => handleReturnBook(book.barcode)}
                >
                  return
                </a>
              </div>
            </div>
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </>
  );
}

export default BookTable;
