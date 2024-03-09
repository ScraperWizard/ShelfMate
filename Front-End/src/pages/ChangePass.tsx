import { useState, ChangeEvent, FormEvent } from "react";
import AnimatedPage from "../Animation/AnimatedPage";
import { showNotification, Notification } from "../context/NotificationProvider";
import socket from "../Socket";
import { useNavigate } from "react-router-dom";

function  ChangePass() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleCurrentPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      showNotification({
        type: "error",
        message: "New password and confirm password do not match",
      } as Notification);
      return;
    }

    socket.emit("change-password", { username, oldPassword: currentPassword, newPassword });

    socket.once("change-password-response", (response) => {
      if (response.success) {
        navigate("/");
        showNotification({
          type: "success",
          message: "Password changed successfully",
        } as Notification);
      } else {
        showNotification({
          type: "error",
          message: "Incorrect username or current password",
        } as Notification);
      }
    });
  };

  return (
    <AnimatedPage>
      <div className="relative w-full h-screen bg-gradient-to-r from-white via-blue-900 to-slate-900" data-name="/change-pass">
        <div className="flex justify-center items-center h-full">
          <form className="max-w-[400px] w-full mx-auto bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative" onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold text-center py-4 text-white hover:text-slate-600">Change Password</h2>

            <div className="flex flex-col mb-4">
              <label className="text-slate-400 hover:text-sky-400">Username: </label>
              <input className="border relative bg-gray-100 p-2" onChange={handleUsernameChange} type="text" placeholder="Username" name="username" />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-slate-400 hover:text-sky-400">Current Password: </label>
              <input className="border relative bg-gray-100 p-2" onChange={handleCurrentPasswordChange} type="password" placeholder="Current Password" name="currentPassword" />
            </div>

            <div className="flex flex-col mb-4">
              <label className="text-slate-400 hover:text-sky-400">New Password: </label>
              <input className="border relative bg-gray-100 p-2" onChange={handleNewPasswordChange} type="password" placeholder="New Password" name="newPassword" />
            </div>

            <div className="flex flex-col">
              <label className="text-slate-400 hover:text-sky-400">Confirm New Password: </label>
              <input className="border relative bg-gray-100 p-2" onChange={handleConfirmPasswordChange} type="password" placeholder="Confirm New Password" name="confirmPassword" />
            </div>

            <button className="w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white hover:scale-110 duration-200">Change Password</button>

            <p className="text-center mt-6 text-slate-400 hover:text-sky-400">
              <a href="/">Cancel</a>
            </p>
          </form>
        </div>
      </div>
    </AnimatedPage>
  );
}

export default ChangePass;
