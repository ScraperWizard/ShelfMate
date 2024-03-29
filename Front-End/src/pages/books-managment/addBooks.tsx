import React, { useState } from "react";
import ManageModal from "../../components/ManageBooks/manageModal";
import socket from "../../Socket";
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
};
function AddBooks() {

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

    console.log("this is the form data", formData);
    socket.emit("add-book", formData);

    socket.once("add-book-response", (response) => {
      console.log(response);
      socket.emit("get-library-books");

      socket.on("library-books-response", (message: Book[]) => {
  
        console.log(message);
      });

     
    });
  };
  return (
    <ManageModal>
      <div className="pt-4 div" data-name="add-book-admin">
        <h1 className="py-2 text-2xl font-semibold">
          Book management settings
        </h1>
      </div>
      <div
            className="p-6"
            style={{ maxHeight: "500px", overflowY: "auto" }}

          >
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

              <div className="mb-4 button">
                <button
                  type="submit"
                  className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test"
                >
                  Add Book
                </button>
              </div>
            </form>
          </div>
    </ManageModal>
  );
}

export default AddBooks;
