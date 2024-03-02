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

function MagazinesLibrary() {
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


  return (
    <div className="library" data-name="magazine">
      <Navbar></Navbar>
      <h1>Library</h1>
      <div className="libraryBox">
        {/* this is where I will loop through each magazine  */}
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

      </div>
    </div>
  );
}

export default MagazinesLibrary;
