import AnimatedPage from "../Animation/AnimatedPage";
// import {
//   showNotification,
//   NotificationProvider,
//   Notification,
// } from "../context/NotificationProvider";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import socket from "../Socket";
export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    emailAddress: "",
    postalAddress: "",
    phoneNum: "",
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Sign up Page
    const firstName = (
      event.currentTarget.elements.namedItem("firstName") as HTMLInputElement
    )?.value;
    const lastName = (
      event.currentTarget.elements.namedItem("lastName") as HTMLInputElement
    )?.value;
    const username = (
      event.currentTarget.elements.namedItem("username") as HTMLInputElement
    )?.value;
    const password = (
      event.currentTarget.elements.namedItem("password") as HTMLInputElement
    )?.value;
    const emailAddress = (
      event.currentTarget.elements.namedItem("emailAddress") as HTMLInputElement
    )?.value;
    const postalAddress = (
      event.currentTarget.elements.namedItem("postalAddress") as HTMLInputElement
    )?.value;
    const phoneNum = (
      event.currentTarget.elements.namedItem(
        "phoneNum"
      ) as HTMLInputElement
    )?.value;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !emailAddress ||
      !postalAddress ||
      !phoneNum
    ) {
     

      return;
    }
    socket.emit("register", formData);

    socket.once("register-account-response", (response) => {
      if (response == null) {
        navigate('/');
      }
    });
  };

  return (
    <AnimatedPage>
      <div
        className="relative w-full h-1150 bg-gradient-to-r from-white via-blue-900 to-slate-900 pb-0"
        data-name="signup"
      >
        <div className="flex justify-center items-center h-full pb-0 pb-40 pt-20">
          <form
            className="max-w-[400px] w-full mx-auto bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative max-h-[1200px]"
            onSubmit={handleSubmit}
          >
            <h2 className="text-4xl font-bold text-center py-4 text-white hover:text-slate-600">
              Sign up
            </h2>

            <div className="flex flex-col mb-2">
              <label className="text-slate-400 hover:text-sky-400">
                Enter your first name :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="text"
                placeholder="username"
                name="firstName"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-slate-400 hover:text-sky-400">
                Enter your last name :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="text"
                placeholder="last name"
                name="lastName"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-slate-400 hover:text-sky-400">
                Enter your emailAddress :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="text"
                placeholder="emailAddress"
                name="emailAddress"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-slate-400 hover:text-sky-400">
                Create a username :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="text"
                placeholder="username"
                name="username"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-slate-400 hover:text-sky-400">
                Create your pasword :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col mb-2">
              <label className="text-slate-400 hover:text-sky-400">
                Enter Your postalAddress :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="text"
                placeholder="postalAddress"
                name="postalAddress"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col ">
              <label className="text-slate-400 hover:text-sky-400">
                Enter Your telephone number :{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                type="text"
                placeholder="telephone-number"
                name="phoneNum"
                onChange={handleChange}
              />
            </div>
            <button
              className="w-full py-3 mt-5 bg-indigo-600 hover:bg-indigo-500 relative text-white hover:scale-110 duration-200"
              type="submit"
            >
              Sign up
            </button>
            <p className='flex items-center mt-2 text-slate-400 hover:text-sky-400"'>
              <input className="mr-2 " type="checkbox" />
              Remember Me
            </p>
            <p className="text-center mt-4 mb-0 text-slate-400 hover:text-sky-400">
              Already a Member? <a href="/">Just Login </a>
            </p>
          </form>
        </div>
      </div>
  
    </AnimatedPage>
  );
}
