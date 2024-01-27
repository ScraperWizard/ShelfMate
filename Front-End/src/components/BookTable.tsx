import React from 'react'

function BookTable() {
  return (
    <div className="myBooks">
        <h1>My Books</h1>
        <div className = "myBooksBox">
                
            <div className="myBooksCard">
                <div className="myBooksImg">
                    <img src="images/book_1.jpg"/>
                

                <div className = "myBoogTag">
                    <p className="writer">John Deo</p>
                    <div className = "categories">Thriller, Horror, Romance </div>
                    <a href = "#" className ="returnBtn">Return</a>
                </div>
                 </div>
            </div>
        
                <div className="myBooksCard">
                    <div className="myBooksImg">
                        <img src="images/book_2.jpg" />
                    </div>
    
                    <div className = "myBoogTag">
                        <p className="writer">John Deo</p>
                        <div className = "categories">Thriller, Horror, Romance</div>
                        <a href = "#" className ="returnBtn">Return</a>
                    </div>
                </div>

                <div className="myBooksCard">
                    <div className="myBooksImg">
                        <img src="images/book_3.jpg" />
                    </div>
    
                    <div className = "myBoogTag">
                        <p className="writer">John Deo</p>
                        <div className = "categories">Thriller, Horror, Romance</div>
                        <a href = "#" className ="returnBtn">Return</a>
                    </div>
                </div>

                <div className="myBooksCard">
                    <div className="myBooksImg">
                        <img src="images/book_4.jpg" />
                    </div>
    
                    <div className = "myBoogTag">
                        <p className="writer">John Deo</p>
                        <div className = "categories">Thriller, Horror, Romance</div>
                        <a href = "#" className ="returnBtn">Return</a>
                    </div>
                </div>

                <div className="myBooksCard">
                    <div className="myBooksImg">
                        <img src="images/book_5.jpg" />
                    </div>
    
                    <div className = "myBoogTag">
                        <p className="writer">John Deo</p>
                        <div className = "categories">Thriller, Horror, Romance</div>
                        <a href = "#" className ="returnBtn">Return</a>
                    </div>
                </div>

                <div className="myBooksCard">
                    <div className="myBooksImg">
                        <img src="images/book_7.png" />
                    </div>
    
                    <div className = "myBoogTag">
                        <p className="writer">John Deo</p>
                        <div className = "categories">Thriller, Horror, Romance</div>
                        <a href = "#" className ="returnBtn">Return</a>
                    </div>
                </div>
                
                <div className="myBooksCard">
                    <div className="myBooksImg">
                        <img src="images/book_8.png" />
                    </div>
    
                    <div className = "myBoogTag">
                        <p className="writer">John Deo</p>
                        <div className = "categories">Thriller, Horror, Romance</div>
                        <a href = "#" className ="returnBtn">Return</a>
                    </div>
                </div>


        </div>
    </div>
  )
}

export default BookTable
