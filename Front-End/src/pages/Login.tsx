import { useState, ChangeEvent, FormEvent } from "react";
import AnimatedPage from "../Animation/AnimatedPage";
import { showNotification, Notification } from "../context/NotificationProvider";
import socket from "../Socket";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const navigate = useNavigate();
  const [username, setUsernameLocal] = useState("");
  const [password, setPassword] = useState("");
  const { setAccessToken, setUserType, setUsername } = useAuth();
  
  
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameLocal(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  let userType = undefined;
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    socket.emit("authenticate", { username, password });

    socket.once("autheticate-response", (message) => {
      if (message?.id) {
        console.log(message);

        setAccessToken(message.accessToken); 
        setUserType(message.user_type);
        setUsername(message.username);
        userType = message.user_type;
        if(userType === "student") navigate("/home");
        else if(userType === "librarian") navigate("/Librarian-setting");
        else if(userType == "admin") navigate("/admin");
        showNotification({
          type: "success",
          message: "Authentication successful",
        } as Notification);
      }
      
    });
  };

  

  return (
    <AnimatedPage>
      <div className="relative w-full h-screen bg-gradient-to-r from-white via-blue-900 to-slate-900" data-name="/">
        <div className="flex justify-center items-center h-full">
          <form className="max-w-[400px] w-full mx-auto bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative" onSubmit={submit}>
            <h2 className="text-4xl font-bold text-center py-4 text-white hover:text-slate-600">Login</h2>

            <div className="flex flex-col mb-4">
              <label className="text-slate-400 hover:text-sky-400">Enter your username: </label>
              <input className="border relative bg-gray-100 p-2" onChange={handleUsernameChange} type="text" placeholder="username" name="username" id="username" />
            </div>

            <div className="flex flex-col">
              <label className="text-slate-400 hover:text-sky-400">Enter your password: </label>
              <input className="border relative bg-gray-100 p-2" onChange={handlePasswordChange} type="password" placeholder="password" id="password" />
            </div>

            <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white hover:scale-110 duration-200">Sign In</button>

            <p className='flex items-center mt-2 text-slate-400 hover:text-sky-400"'>
              <input className="mr-2 " type="checkbox" />
              Remember Me
            </p>

            <p className="text-center mt-6 text-slate-400 hover:text-sky-400">
              forgot password?? <a href="/change-pass">change password</a>
            </p>

            <p className="text-center mt-6 text-slate-400 hover:text-sky-400">
              Not a member? <a href="/signup">Sign up now</a>
            </p>

            
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default Login;
