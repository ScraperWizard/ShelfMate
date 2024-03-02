import Navbar from "../components/Navbar";
import "../styles/Library.css";
import socket from "../Socket";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import BookModal from "../components/BookModal";
import { Fragment } from "react";
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
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    language: "",
    year_of_prod: 0,
    publisher: "",
    subjects: "",
    no_of_pages: 0,
    price: 0,
    rack: 0,
    image: "",
    isbn: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const [books, setBooks] = useState<Book[]>([]);
  const { accessToken } = useAuth();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);

  useEffect (() => {
    socket.emit("get-library-books");

    socket.on("library-books-response", (response: Book[]) => {
      setBooks(response);
      console.log(response)
    });

    return () => {
      socket.off("library-books-response");
    };
  }, []);


  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = (
      event.currentTarget.elements.namedItem("title") as HTMLInputElement
    )?.value;
    const author = (
      event.currentTarget.elements.namedItem("author") as HTMLInputElement
    )?.value;
    const language = (
      event.currentTarget.elements.namedItem("language") as HTMLInputElement
    )?.value;
    const year_of_prod = (
      event.currentTarget.elements.namedItem("year_of_prod") as HTMLInputElement
    )?.value;
    const publisher = (
      event.currentTarget.elements.namedItem("publisher") as HTMLInputElement
    )?.value;
    const subjects = (
      event.currentTarget.elements.namedItem("subjects") as HTMLInputElement
    )?.value;
    const no_of_pages = (
      event.currentTarget.elements.namedItem(
        "no_of_pages"
      ) as HTMLInputElement
    )?.value;
    const price = (
      event.currentTarget.elements.namedItem(
        "price"
      ) as HTMLInputElement
    )?.value;
    const rack = (
      event.currentTarget.elements.namedItem(
        "rack"
      ) as HTMLInputElement
    )?.value;
    const image = (
      event.currentTarget.elements.namedItem(
        "image"
      ) as HTMLInputElement
    )?.value;
    const isbn = (
      event.currentTarget.elements.namedItem(
        "isbn"
      ) as HTMLInputElement
    )?.value;

    if (
      !title ||
      !author ||
      !language ||
      !year_of_prod ||
      !publisher ||
      !subjects ||
      !no_of_pages ||
      !price ||
      !rack ||
      !image ||
      !isbn
    ) {
     
      console.log("fields' values are missing");
      return;
    }
    console.log(formData)
    formData.price = Number(formData.price);
    formData.no_of_pages = Number(formData.no_of_pages);
    formData.year_of_prod = Number(formData.year_of_prod);
    formData.rack = Number(formData.rack);
    
    socket.emit("add-book", formData);

    socket.once("add-book-response", (response) => {
      console.log(response)
    });
  };

  const handleView = (book: Book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

const [removeBook, setRemoveBook] = useState({
  barcode : 0,
});
const handleBarCode = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setRemoveBook({ barcode : parseInt(value) });
};

const handleRemovingBook = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const barcode = (
    event.currentTarget.elements.namedItem("barcode") as HTMLInputElement
  )?.value;
if (
    !barcode
  ) {
   
    console.log("barcode is missing");
    return;
  }
  console.log(removeBook)
  socket.emit("delete-item", removeBook);

  socket.once("delete-item-response", (response) => {
    console.log(response)
  });
};


  return (
    <>
      <Fragment>
        <Navbar></Navbar>
        <div className="library" data-name="Librarian-page">
          =<h1>Library</h1>
          <div className="mb-4 flex justify-center">
            <button
              className="mr-4 bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal(true)}
            >
              Add a new book
            </button>
            <button
              className="mr-4  bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal2(true)}
            >
              Remove a book
            </button>
            <button
              className="mr-4  bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal3(true)}
            >
              Update a book
            </button>
          </div>
          <div className="libraryBox">

            {books.length > 0 &&
              books.map((book) => (
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
                    <a
                      href="#"
                      className="borrowBtn"
                      onClick={(e) => {
                        e.preventDefault();
                        handleView(book);
                      }}
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <BookModal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="p-6" style={{ maxHeight: "500px", overflowY: "auto" }}>
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Add New Book
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
            {/* author */}

            <div className="mb-4">
              <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author</label>
              <input
                type="text"
                id="author"
                name="author"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>

            {/* language */}
            <div className="mb-4">
              <label htmlFor="language" className="block text-gray-700 font-bold mb-2">Language</label>
              <input
                type="text"
                id="language"
                name="language"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>

            {/* year_of_prod */}

            <div className="mb-4">
              <label htmlFor="year_of_prod" className="block text-gray-700 font-bold mb-2">Year of production</label>
              <input
                type="number"
                id="year_of_prod"
                name="year_of_prod"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>

            {/* publisher */}
            
            <div className="mb-4">
              <label htmlFor="publisher" className="block text-gray-700 font-bold mb-2">Publisher</label>
              <input
                type="text"
                id="publisher"
                name="publisher"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>

            {/* subjects */}

            <div className="mb-4">
              <label htmlFor="subjects" className="block text-gray-700 font-bold mb-2">Subjects</label>
              <input
                type="text"
                id="subjects"
                name="subjects"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>
            
            {/* no_of_pages */}

            <div className="mb-4">
              <label htmlFor="no_of_pages" className="block text-gray-700 font-bold mb-2">Number of pages</label>
              <input
                type="number"
                id="no_of_pages"
                name="no_of_pages"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>

            {/* price */}

            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>

            {/* rack */}

            <div className="mb-4">
              <label htmlFor="rack" className="block text-gray-700 font-bold mb-2">Rack</label>
              <input
                type="number"
                id="rack"
                name="rack"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>

            {/* image */}

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
              <input
                type="text"
                id="image"
                name="image"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>

            {/* isbn */}
            <div className="mb-4">
              <label htmlFor="isbn" className="block text-gray-700 font-bold mb-2">ISBN</label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleChange}
              />
            </div>


            <div className="mb-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Add Book</button>
            </div>
          </form>
        </div>


        </BookModal>

        <BookModal isVisible={showModal2} onClose={() => setShowModal2(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Remove a book
          </h3>
          <form onSubmit={handleRemovingBook}>
            <div className="mb-4">
              <label htmlFor="barcode" className="block text-gray-700 font-bold mb-2">Barcode of the book to be removed</label>
              <input
                type="number"
                id="barcode"
                name="barcode"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                onChange={handleBarCode}
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Remove Book</button>
            </div>
          </form>
        </div>
        </BookModal>
        <BookModal isVisible={showModal3} onClose={() => setShowModal3(false)}>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-5">
            Update a book
          </h3>
          <form >
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="details" className="block text-gray-700 font-bold mb-2">Details</label>
              <textarea
                id="details"
                name="details"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 font-bold mb-2">Status</label>
              <select
                id="status"
                name="status"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="Borrow">Borrow</option>
                <option value="Return">Return</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="capacity" className="block text-gray-700 font-bold mb-2">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Book</button>
            </div>
          </form>
        </div>
        </BookModal>
      </Fragment>
    </>
  );
}

export default Library;
