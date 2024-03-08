import React, { useState } from "react";
import socket from "../../Socket";
import StudentOptions from "../../components/students-managements/StudentOptions";
interface User {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  street_name: string;
  emailAddress: string;
  phoneNum: string;
  userType: string;
}
function AddStudents() {
  const [formData, setFormData] = useState<User>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    city: "",
    street_name: "",
    emailAddress: "",
    phoneNum: "",
    userType: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("this is what add user request get", formData);

    socket.emit("add-user", formData);
    socket.on("add-user-response", (message: any) => {
      console.log("this is the message from adding a new student", message);
    });
  };
  return (
    <StudentOptions data-name="add-students">
      <div className="pt-4 div" data-name="add-book-admin">
        <h1 className="py-2 text-2xl font-semibold">Add users settings</h1>
      </div>
      <div className="p-6" style={{ maxHeight: "500px", overflowY: "auto" }}>
        <h3 className="text-xl font-semibold text-gray-900 mb-5">
          Add a new student
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-bold mb-2"
            >
              username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold mb-2"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-gray-700 font-bold mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-gray-700 font-bold mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="city"
              className="block text-gray-700 font-bold mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="street_name"
              className="block text-gray-700 font-bold mb-2"
            >
              Street Name
            </label>
            <input
              type="text"
              id="street_name"
              name="street_name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="emailAddress"
              className="block text-gray-700 font-bold mb-2"
            >
              Email address
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="phoneNum"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone number
            </label>
            <input
              type="number"
              id="phoneNum"
              name="phoneNum"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="userType"
              className="block text-gray-700 font-bold mb-2"
            >
              User Type
            </label>
            <select
              id="userType"
              name="userType"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            >
              <option value="">Select User Type</option>
              <option value="student">Student</option>
              <option value="librarian">Librarian</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="mb-4 button">
            <button
              type="submit"
              className="hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline test"
            >
              Add user
            </button>
          </div>
        </form>
      </div>
    </StudentOptions>
  );
}

export default AddStudents;
