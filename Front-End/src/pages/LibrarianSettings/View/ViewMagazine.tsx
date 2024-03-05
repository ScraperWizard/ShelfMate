import { useState } from "react";
import BookModal from "../../../components/BookModal";
import socket from "../../../Socket";

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
    no_of_pages: number;
    isbn: string;
    rack: number;
};

type BookModalProps = {
  isVisible: boolean;
  onClose: () => void;
  selectedBook: Book | null;
  setBook: (books: Book[]) => void;
};

const ViewMagazine: React.FC<BookModalProps> = ({
  isVisible,
  onClose,
  selectedBook,
  setBook
}) => {
  const handleRemoveInView = (number: number) => {
    console.log("this is the value of the remove book", {barcode: number});

    socket.emit("delete-item", {barcode: number});

    socket.once("delete-item-response", (response) => {
      console.log(response);

      socket.emit("get-library-books");
      socket.on("library-books-response", (message: Book[]) => {
        setBook(message);
        console.log(message);
      });
    });
  };
  return (
    <BookModal isVisible={isVisible} onClose={onClose}>
      {selectedBook && (
        <div className="p-6" style={{ maxHeight: "500px", overflowY: "auto" }}>
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

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-bold mb-2"
            >
              Price
            </label>
            <p>{selectedBook.price}</p>
          </div>

          <div className="mb-4 button">
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test mr-3"
              onClick={() => {
                handleRemoveInView(selectedBook.barcode);
              }}
            >
              remove
            </button>
            <button
              type="submit"
              className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test"
              
            >
              Update
            </button>
          </div>
        </div>
      )}
    </BookModal>
  );
};

export default ViewMagazine;
