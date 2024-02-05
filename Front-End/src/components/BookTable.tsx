import React from "react";
import Navbar from "../components/Navbar";
import book1 from "../assets/book_1.jpg";
import book2 from "../assets/book_2.jpg";
import book3 from "../assets/book_3.jpg";
import book4 from "../assets/book_4.jpg";
import book5 from "../assets/book_5.jpg";
import book6 from "../assets/book_7.png";
import book7 from "../assets/book_8.png";
import "../styles/myBooks.css";
import socket from "../Socket";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";

type Book = {
  id: number;
  image: string;
  genre: string;
  title: string;
  copies: string;
};
function BookTable() {
  const [borrowedBooks, setBorrowedBooks] = useState<Book[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      socket.emit("get-borrowed-books", { username: user.username });

      socket.on("borrowed-books-response", (response: Book[]) => {
        setBorrowedBooks(response);
      });

      return () => {
        socket.off("borrowed-books-response");
      };
    }
  }, [user]);

  const handleReturn = (bookId: number) => {
    socket.emit("return-book", { bookId, borrower: user?.username });

    setBorrowedBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, copies: book.copies + 1 } : book
      )
    );
  };
  return (
    <>
      <Navbar></Navbar>
      <div className="myBooks" data-name="book-table">
        <h1>My Books</h1>
        <div className="myBooksBox">
          {borrowedBooks.map((book) => (
            <div className="myBooksCard" key={book.id}>
              <div className="myBooksImg">
                <img src={book.image} className="Img" />
                <div className="myBoogTag">
                  <p className="writer">{book.title}</p>
                  <div className="categories">{book.genre}</div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleReturn(book.id);
                    }}
                    className="returnBtn"
                  >
                    Return
                  </a>
                </div>
              </div>
            </div>
          ))}


        {/* this is like a placeholder done by yaman and I will remove it as soon as I check everything is right */}
          <div className="myBooksCard">
            <div className="myBooksImg">
              <img src={book1} className="Img" />

              <div className="myBoogTag">
                <p className="writer">John Deo</p>
                <div className="categories">Thriller, Horror, Romance </div>
                <a href="#" className="returnBtn">
                  Return
                </a>
              </div>
            </div>
          </div>

          <div className="myBooksCard">
            <div className="myBooksImg">
              <img src={book2} className="Img" />
            </div>

            <div className="myBoogTag">
              <p className="writer">John Deo</p>
              <div className="categories">Thriller, Horror, Romance</div>
              <a href="#" className="returnBtn">
                Return
              </a>
            </div>
          </div>

          <div className="myBooksCard">
            <div className="myBooksImg">
              <img src={book3} className="Img" />
            </div>

            <div className="myBoogTag">
              <p className="writer">John Deo</p>
              <div className="categories">Thriller, Horror, Romance</div>
              <a href="#" className="returnBtn">
                Return
              </a>
            </div>
          </div>

          <div className="myBooksCard">
            <div className="myBooksImg">
              <img src={book4} className="Img" />
            </div>

            <div className="myBoogTag">
              <p className="writer">John Deo</p>
              <div className="categories">Thriller, Horror, Romance</div>
              <a href="#" className="returnBtn">
                Return
              </a>
            </div>
          </div>

          <div className="myBooksCard">
            <div className="myBooksImg">
              <img src={book5} className="Img" />
            </div>

            <div className="myBoogTag">
              <p className="writer">John Deo</p>
              <div className="categories">Thriller, Horror, Romance</div>
              <a href="#" className="returnBtn">
                Return
              </a>
            </div>
          </div>

          <div className="myBooksCard">
            <div className="myBooksImg">
              <img src={book6} className="Img" />
            </div>

            <div className="myBoogTag">
              <p className="writer">John Deo</p>
              <div className="categories">Thriller, Horror, Romance</div>
              <a href="#" className="returnBtn">
                Return
              </a>
            </div>
          </div>

          <div className="myBooksCard">
            <div className="myBooksImg">
              <img src={book7} className="Img" />
            </div>

            <div className="myBoogTag">
              <p className="writer">John Deo</p>
              <div className="categories">Thriller, Horror, Romance</div>
              <a href="#" className="returnBtn">
                Return
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookTable;
