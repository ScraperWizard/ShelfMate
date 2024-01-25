import React, { useState, ChangeEvent, FormEvent } from "react";
import AnimatedPage from "../Animation/AnimatedPage";
import {
  showNotification,
  NotificationProvider,
  Notification,
} from "../context/NotificationProvider";
import socket from "../Socket";
import { redirect } from "react-router-dom";
import { useContext } from "react";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  let userData = null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("authenticate", { username, password });

    socket.once("autheticate-response", (message) => {
      if (message?.id) {
        userData = {
          username: message.username,
          password: message.password,
          id: message.id,
          first_name: message.first_name,
          last_name: message.last_name,
          postal: message.postal_address,
          email: message.email_adress,
          telephone_number: message.mobile_num,
        };

        const { login } = useAuth();
        login(userData);// another reminder for myself this is where the user information is set
        
        showNotification({
          type: "success",
          message: "Authentication successful",
        } as Notification);
      }
    });
  };

  return (
    <AnimatedPage>
      <div
        className="relative w-full h-screen bg-gradient-to-r from-white via-blue-900 to-slate-900"
        data-name="login"
      >
        <div className="flex justify-center items-center h-full">
          <form
            className="max-w-[400px] w-full mx-auto bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative"
            onSubmit={submit}
          >
            <h2 className="text-4xl font-bold text-center py-4 text-white hover:text-slate-600">
              Login
            </h2>

            <div className="flex flex-col mb-4">
              <label className="text-slate-400 hover:text-sky-400">
                Enter your username:{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                onChange={handleUsernameChange}
                type="text"
                placeholder="username"
                name="username"
                id="username"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-slate-400 hover:text-sky-400">
                Enter your password:{" "}
              </label>
              <input
                className="border relative bg-gray-100 p-2"
                onChange={handlePasswordChange}
                type="password"
                placeholder="password"
                id="password"
              />
            </div>

            <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white hover:scale-110 duration-200">
              Sign In
            </button>

            <p className='flex items-center mt-2 text-slate-400 hover:text-sky-400"'>
              <input className="mr-2 " type="checkbox" />
              Remember Me
            </p>

            <p className="text-center mt-8 text-slate-400 hover:text-sky-400">
              Not a member? <a href="/signup">Sign up now</a>
            </p>

            <p className="text-center mt-8 text-slate-400 hover:text-sky-400">
              Not a member? <a href="/home">go home</a>
            </p>
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default Login;
