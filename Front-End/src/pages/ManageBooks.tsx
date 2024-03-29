import Navbar from "../components/Navbar";
import "../styles/Library.css";
import socket from "../Socket";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import BookModal from "../components/BookModal";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
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
};

type magazine = {
  id: number;
  image: string;
  genre: string;
  title: string;
  copies: number;
  author: string;
  language: string;
  year_of_prod: number;
  publisher: string;
  subjects: string;
  price: number;
  edition_num: string;
  editor: string;
};

function Library() {
  const navigate = useNavigate();
  
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
    type:"",
    barcode: 0,
  });

  const [newMagazineData, setNewMagazineData] = useState({
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
    edition_num: "",
    editor: "",
  })


  const handleNewMagazine = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMagazineData({ ...newMagazineData, [name]: value });
  };

const handleAddMagazine = (event: React.FormEvent<HTMLFormElement>) => {
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
    event.currentTarget.elements.namedItem("no_of_pages") as HTMLInputElement
  )?.value;
  const price = (
    event.currentTarget.elements.namedItem("price") as HTMLInputElement
  )?.value;
  const rack = (
    event.currentTarget.elements.namedItem("rack") as HTMLInputElement
  )?.value;
  const image = (
    event.currentTarget.elements.namedItem("image") as HTMLInputElement
  )?.value;
  const edition_num = (
    event.currentTarget.elements.namedItem("edition_num") as HTMLInputElement
  )?.value;
  const editor = (
    event.currentTarget.elements.namedItem("editor") as HTMLInputElement
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
    !edition_num ||
    !editor ||
    !image
  ) {
    console.log("fields' values are missing");
    return;
  }
  console.log(newMagazineData);
  newMagazineData.price = Number(newMagazineData.price);
  newMagazineData.no_of_pages = Number(newMagazineData.no_of_pages);
  newMagazineData.year_of_prod = Number(newMagazineData.year_of_prod);
  newMagazineData.rack = Number(newMagazineData.rack);
  
  console.log('new mgaazine data', newMagazineData)
  socket.emit("add-magazine", newMagazineData);

  socket.once("add-magazine-response", (response) => {
    console.log(response);
    socket.emit("get-library-books");

    socket.on("library-books-response", (message:Book[]) => {
      setBooks(message);
      console.log(message);
    });

    navigate("/Librarian-page");
  });
};


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const [updateData, setUpdateData] = useState({
    title: "",
    author: "",
    barcode: 0,
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
  
  

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData({ ...updateData, [name]: value });
  };

  const handleUpdatingData = (event: React.FormEvent<HTMLFormElement>) => {
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
      event.currentTarget.elements.namedItem("no_of_pages") as HTMLInputElement
    )?.value;
    const price = (
      event.currentTarget.elements.namedItem("price") as HTMLInputElement
    )?.value;
    const rack = (
      event.currentTarget.elements.namedItem("rack") as HTMLInputElement
    )?.value;
    const image = (
      event.currentTarget.elements.namedItem("image") as HTMLInputElement
    )?.value;
    const isbn = (
      event.currentTarget.elements.namedItem("isbn") as HTMLInputElement
    )?.value;
    const barcode = (
      event.currentTarget.elements.namedItem("barcode") as HTMLInputElement
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
      !isbn ||
      !barcode
    ) {
      console.log("fields' values are missing");
      return;
    }
    console.log(updateData);
    updateData.barcode = Number(updateData.barcode);
    updateData.year_of_prod = Number(updateData.year_of_prod);
    updateData.no_of_pages = Number(updateData.no_of_pages);
    updateData.price = Number(updateData.price);
    updateData.rack = Number(updateData.rack);

    console.log("this is the update data for book", updateData);
    socket.emit("update-book", updateData);

    socket.once("update-book-response", (response) => {
      console.log(response);

      socket.emit("get-library-books");

      socket.on("library-books-response", (message: Book[]) => {
        setBooks(message);
        console.log(message);
      });
    });
  };

  const [books, setBooks] = useState<Book[]>([]);
  const { accessToken } = useAuth();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  

  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const handleView = (book: Book) => {
    setSelectedBook(book);
    setShowModal4(true);
  };
  useEffect(() => {
    socket.emit("get-library-books");

    socket.on("library-books-response", (response: Book[]) => {
      setBooks(response);
      console.log(response);
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
      event.currentTarget.elements.namedItem("no_of_pages") as HTMLInputElement
    )?.value;
    const price = (
      event.currentTarget.elements.namedItem("price") as HTMLInputElement
    )?.value;
    const rack = (
      event.currentTarget.elements.namedItem("rack") as HTMLInputElement
    )?.value;
    const image = (
      event.currentTarget.elements.namedItem("image") as HTMLInputElement
    )?.value;
    const isbn = (
      event.currentTarget.elements.namedItem("isbn") as HTMLInputElement
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
    console.log(formData);
    formData.price = Number(formData.price);
    formData.no_of_pages = Number(formData.no_of_pages);
    formData.year_of_prod = Number(formData.year_of_prod);
    formData.rack = Number(formData.rack);

    socket.emit("add-book", formData);

    socket.once("add-book-response", (response) => {
      console.log(response);
      socket.emit("get-library-books");

      socket.on("library-books-response", (message: Book[]) => {
        setBooks(message);
        console.log(message);
      });

      navigate("/Librarian-page");
    });
  };

 

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const [removeBook, setRemoveBook] = useState({
    barcode: 0,
  });
  const handleBarCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRemoveBook({ barcode: parseInt(value) });
  };

  const handleRemovingBook = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const barcode = (
      event.currentTarget.elements.namedItem("barcode") as HTMLInputElement
    )?.value;
    if (!barcode) {
      console.log("barcode is missing");
      return 
    }

    console.log("this is the first default value of the remove book", removeBook)
    socket.emit("delete-item", removeBook);

    socket.once("delete-item-response", (response) => {
      console.log(response);

      socket.emit("get-library-books");

      socket.on("library-books-response", (message: Book[]) => {
        setBooks(message);
        console.log(message);
      });
    });
  };

  const handleRemoveInView = () => {
    
    if (!removeBook) {
      console.log("barcode is missing");
      return 
    }
    
    removeBook.barcode = selectedBook?.barcode as number;
    
    console.log("this is the value of the remove book", removeBook)

    socket.emit("delete-item", removeBook);

    socket.once("delete-item-response", (response) => {
      console.log(response);

      socket.emit("get-library-books");

      socket.on("library-books-response", (message: Book[]) => {
        setBooks(message);
        console.log(message);
      });
    });
  };
  return (
    <>
      <Fragment>
        <Navbar></Navbar>
        <div className="library" data-name="Librarian-page">
          <h1>Library</h1>
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
              Remove item
            </button>
            <button
              className="mr-4  bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal3(true)}
            >
              Update a book
            </button>
            <button
              className="mr-4  bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setShowModal5(true)}
            >
              Add magazine
            </button>
            <button
              className="mr-4  bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              // onClick={() => setShowModal3(true)}
            >
              Update magazine
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
                  <p>{book.title}</p>
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
       

        <BookModal isVisible={showModal4} onClose={() => setShowModal4(false)}>
          {selectedBook && ( 
          <div
            className="p-6"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Book Info
            </h3>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-gray-700 font-bold mb-2"
              >
                Title
              </label>
              <p>{selectedBook.title}</p>
            </div>
            {/* author */}

            <div className="mb-4">
              <label
                htmlFor="author"
                className="block text-gray-700 font-bold mb-2"
              >
                Author
              </label>
              <p>{selectedBook.author}</p>
            </div>

            {/* language */}
            <div className="mb-4">
              <label
                htmlFor="language"
                className="block text-gray-700 font-bold mb-2"
              >
                Language
              </label>
              <p>{selectedBook.language}</p>
            </div>

            {/* year_of_prod */}

            <div className="mb-4">
              <label
                htmlFor="year_of_prod"
                className="block text-gray-700 font-bold mb-2"
              >
                Year of production
              </label>
              <p>{selectedBook.year_of_prod}</p>
            </div>

            {/* publisher */}

            <div className="mb-4">
              <label
                htmlFor="publisher"
                className="block text-gray-700 font-bold mb-2"
              >
                Publisher
              </label>
              <p>{selectedBook.publisher}</p>
            </div>

            {/* subjects */}

            <div className="mb-4">
              <label
                htmlFor="subjects"
                className="block text-gray-700 font-bold mb-2"
              >
                Subjects
              </label>
              <p>{selectedBook.subjects}</p>
            </div>

            {/* no_of_pages */}

            {/* price */}

            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-gray-700 font-bold mb-2"
              >
                Price
              </label>
              <p>{selectedBook.price}</p>
            </div>

          </div>
          )}
        </BookModal>

        <BookModal isVisible={showModal5} onClose={() => setShowModal5(false)}>
          <div
            className="p-6"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-5">
              Add a new magazine
            </h3>
            <form onSubmit={handleAddMagazine}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>
              {/* author */}

              <div className="mb-4">
                <label
                  htmlFor="author"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              {/* language */}
              <div className="mb-4">
                <label
                  htmlFor="language"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Language
                </label>
                <input
                  type="text"
                  id="language"
                  name="language"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              {/* year_of_prod */}

              <div className="mb-4">
                <label
                  htmlFor="year_of_prod"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Year of production
                </label>
                <input
                  type="number"
                  id="year_of_prod"
                  name="year_of_prod"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              {/* publisher */}

              <div className="mb-4">
                <label
                  htmlFor="publisher"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Publisher
                </label>
                <input
                  type="text"
                  id="publisher"
                  name="publisher"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              {/* subjects */}

              <div className="mb-4">
                <label
                  htmlFor="subjects"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Subjects
                </label>
                <input
                  type="text"
                  id="subjects"
                  name="subjects"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              {/* no_of_pages */}

              <div className="mb-4">
                <label
                  htmlFor="no_of_pages"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Number of pages
                </label>
                <input
                  type="number"
                  id="no_of_pages"
                  name="no_of_pages"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              {/* price */}

              <div className="mb-4">
                <label
                  htmlFor="price"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              {/* rack */}

              <div className="mb-4">
                <label
                  htmlFor="rack"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Rack
                </label>
                <input
                  type="number"
                  id="rack"
                  name="rack"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              {/* image */}

              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Image
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              {/* edition_num */}
              <div className="mb-4">
                <label
                  htmlFor="edition_num"
                  className="block text-gray-700 font-bold mb-2"
                >
                  edition_num
                </label>
                <input
                  type="text"
                  id="edition_num"
                  name="edition_num"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              {/* editor */}

              <div className="mb-4">
                <label
                  htmlFor="editor"
                  className="block text-gray-700 font-bold mb-2"
                >
                  editor
                </label>
                <input
                  type="text"
                  id="editor"
                  name="editor"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  onChange={handleNewMagazine}
                />
              </div>

              <div className="mb-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </BookModal>
      </Fragment>
    </>
  );
}

export default Library;