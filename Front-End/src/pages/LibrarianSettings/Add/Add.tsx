import { useEffect, useState } from "react";
import SettingsModal from "../../../components/LibrarianPanel/settings/SettingsModal";
import socket from "../../../Socket";
export default function Add() {
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
  const [formDataObject, setFormData] = useState({
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formDataObject, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const language = formData.get("language") as string;
  const year_of_prod = formData.get("year_of_prod") as string;
  const publisher = formData.get("publisher") as string;
  const subjects = formData.get("subjects") as string;
  const no_of_pages = formData.get("no_of_pages") as string;
  const price = formData.get("price") as string;
  const rack = formData.get("rack") as string;
  const image = formData.get("image") as string;
  const isbn = formData.get("isbn") as string;

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
    console.log(formDataObject);
    formDataObject.price = Number(formDataObject.price);
    formDataObject.no_of_pages = Number(formDataObject.no_of_pages);
    formDataObject.year_of_prod = Number(formDataObject.year_of_prod);
    formDataObject.rack = Number(formDataObject.rack);

    socket.emit("add-book", formDataObject);

    socket.once("add-book-response", (response) => {
      console.log(response);
      socket.emit("get-library-books");

      socket.on("library-books-response", (message: Book[]) => {
      });


    });
  };

  return (
    <SettingsModal data-name="add">
      <div className="p-6" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <h3 className="text-xl font-semibold text-gray-900 mb-5">
          Add New Book
        </h3>
        <form onSubmit={handleSubmit}>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>

          {/* isbn */}
          <div className="mb-4">
            <label
              htmlFor="isbn"
              className="block text-gray-700 font-bold mb-2"
            >
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
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
    </SettingsModal>
  );
}
