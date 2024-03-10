import React, { useEffect, useState } from "react";
import socket from "../Socket";
import SettingsPanel from "../components/settings/settingsModal";
import { useAuth } from "../context/AuthProvider";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

interface UserInfo {
    card_number: string;
    activation_date: string;
    card_status: string;
    card_type: string;
    user_id: number;
  }
function ViewAccount() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newpasswordConfirm, setConfirmPassword] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const { username } = useAuth();
  const navigate = useNavigate();

  const changePass = () => {
    console.log("This is what the request change pass get ", {
      oldPassword: oldPassword,
      newPassword: newPassword,
      newpasswordConfirm: newpasswordConfirm,
    });
    socket.emit("change-password", {
      oldPassword: oldPassword,
      newPassword: newPassword,
      newpasswordConfirm: newpasswordConfirm,
    });
    socket.on("change-password-response", (message: any) => {
      console.log("This is the response from changing the password: ", message);
    });
  };

  useEffect(() => {
    socket.emit("get-my-info", {});

    socket.on("get-my-info-response", (messaage) => {
      console.log("This is the response that i get from get-my-info", messaage);
    });
  });

  return (
    <div data-name="ViewAccount">
      <Navbar></Navbar>

      <div
        className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto"
        data-name="settings"
      >
        <div className="grid grid-cols-8 pt-3 mr-10 sm:grid-cols-10">
          <div className="relative my-4 w-56 sm:hidden">
            <input
              className="peer hidden"
              type="checkbox"
              name="select-1"
              id="select-1"
            />
          </div>

          <div className="col-span-2 hidden sm:block"></div>
          <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="pt-4">
              <h1 className="py-2 text-2xl font-semibold">Account Details</h1>
            </div>
            <hr className="mt-4 mb-8" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <p className="text-gray-600">
                Your username is <strong>{username}</strong>
              </p>
            </div>
            <div className="py-2">
              <p className="text-xl font-semibold">Additional Information</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <p className="text-gray-600">Card Number: {userInfo?.card_number}</p>
                <p className="text-gray-600">Activation Date: {userInfo?.activation_date}</p>
                <p className="text-gray-600">Card Status: {userInfo?.card_status}</p>
                <p className="text-gray-600">Card Type: {userInfo?.card_type}</p>
                <p className="text-gray-600">User ID: {userInfo?.user_id}</p>
              </div>
            </div>
            <p className="py-2 text-xl font-semibold">Your username</p>
            
            <hr className="mt-4 mb-8" />
            <p className="py-2 text-xl font-semibold">Password</p>
            <div className="flex items-center">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                <label htmlFor="old-password">
                  <span className="text-sm text-gray-500">
                    Current Password
                  </span>
                  <input
                    type="password"
                    id="old-password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </label>
                <label htmlFor="new-password">
                  <span className="text-sm text-gray-500">New Password</span>
                  <input
                    type="password"
                    id="new-password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </label>
                <label htmlFor="confirm-password">
                  <span className="text-sm text-gray-500">
                    Confirm new password
                  </span>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    placeholder="Confirm your new password"
                    value={newpasswordConfirm}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </label>
              </div>
            </div>
            <button
              className="mt-4 rounded-lg px-4 py-2 text-white"
              onClick={changePass}
            >
              Save Password
            </button>
            <hr className="mt-4 mb-8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAccount;