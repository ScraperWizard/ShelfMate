import Navbar from "../components/Navbar";
import "../styles/Library.css";
import socket from "../Socket";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

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
};

function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const { accessToken } = useAuth();

  useEffect(() => {
    socket.emit("get-library-books");

    socket.on("library-books-response", (response: Book[]) => {
      setBooks(response);
      console.log(response)
    });

    return () => {
      socket.off("library-books-response");
    };
  }, []);

  // const handleBorrow = (bookId: number) => {
  //   socket.emit("borrow-book", { bookId, borrower: accessToken?.username });

  //   setBooks((prevBooks) =>
  //     prevBooks.map((book) =>
  //       book.id === bookId ? { ...book, copies: book.copies - 1 } : book
  //     )
  //   );
  // };

  return (
    <div className="library" data-name="library">
      <Navbar></Navbar>
      <h1>Library</h1>
      <div className="libraryBox">
        {/* this is where I will loop through each book  */}
        {books.length > 0 &&
          books.map((book) => (
            <div className="libraryCards" key={book.id}>
              <div className="libraryImage">
                <img src={book.image} className="Image" alt={book.title} />
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
                    // handleBorrow(book.id);
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
  );
}

export default Library;
