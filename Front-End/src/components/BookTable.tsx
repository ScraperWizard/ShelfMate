import React from "react";
import Navbar from "../components/Navbar";
import book1 from "../assets/book_1.jpg";
import book2 from "../assets/book_2.jpg";
import book3 from "../assets/book_3.jpg";
import book4 from "../assets/book_4.jpg";
import book5 from "../assets/book_5.jpg";
import book6 from "../assets/book_7.png";
import book7 from "../assets/book_8.png";

function BookTable() {
  return (
    <>
      <Navbar></Navbar>
      <div className="myBooks" data-name="book-table">
        <h1>My Books</h1>
        <div className="myBooksBox">
          <div className="myBooksCard">
            <div className="myBooksImg">
              <img src={book1} />

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
              <img src={book2} />
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
              <img src={book3} />
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
              <img src={book4} />
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
              <img src={book5} />
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
              <img src={book6} />
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
              <img src={book7} />
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
