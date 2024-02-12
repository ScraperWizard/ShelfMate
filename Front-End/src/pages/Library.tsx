
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
import {useAuth} from '../context/AuthProvider'

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

  useEffect(() => {
    
      socket.emit("get-library-books");

      socket.on("library-books-response", (response: Book[]) => {
        setBooks(response);
      });

      return () => {
        socket.off("library-books-response");
      };
    
  }, []);

  const handleBorrow = (bookId: number) => {
    socket.emit("borrow-book", { bookId, borrower: accessToken?.username });

    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, copies: book.copies - 1 } : book
      )
    );
  };

  return (
    <div className="library" data-name="library">
      <Navbar></Navbar>
      <h1>Library</h1>
      <div className="libraryBox">
        {/* this is where I will loop through each book  */}
        {books.length > 0 && books.map((book) => (
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
              <a href="#" className="borrowBtn" onClick={(e) => {
                  e.preventDefault();
                  handleBorrow(book.id);
                }}>
                Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
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
              Borrow
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
