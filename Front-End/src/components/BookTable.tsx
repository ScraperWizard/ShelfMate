import React from "react";
import Navbar from "../components/Navbar";
import book1 from "../assets/book_1.jpg";
import book2 from "../assets/book_2.jpg";
import book3 from "../assets/book_3.jpg";
import book4 from "../assets/book_4.jpg";
import book5 from "../assets/book_5.jpg";
import book6 from "../assets/book_7.png";
import book7 from "../assets/book_8.png";
import '../styles/myBooks.css'
import socket from "../Socket";
import {useState, useEffect} from 'react'

function BookTable() {
  const [returnedBooks, setReturnedBooks] = useState([]);

  useEffect(() => {

      socket.emit("getReturnedBooks");

      socket.on("returnedBooks", (data) => {
          setReturnedBooks(data);
      });

      return () => {

          socket.off("returnedBooks");
      };
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <div className="myBooks" data-name="book-table">
        <h1>My Books</h1>
        <div className="myBooksBox">
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
              <img src={book2} className="Img"/>
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
              <img src={book3} className="Img"/>
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
              <img src={book4} className="Img"/>
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
              <img src={book5} className="Img"/>
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
              <img src={book6} className="Img"/>
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
              <img src={book7} className="Img"/>
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
