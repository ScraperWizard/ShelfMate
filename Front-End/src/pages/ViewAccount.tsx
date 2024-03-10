import React, { useEffect, useState } from "react";
import socket from "../Socket";
import { useAuth } from "../context/AuthProvider";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

interface UserInfo {
  username: string;
  first_name: string;
  last_name: string;
  email_address: string;
  mobile_number: string;
  City: string;
  Street_name: string;
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

    socket.on("get-my-info-response", (message: UserInfo) => {
      console.log("This is the response that i get from get-my-info", message);
      setUserInfo(message);
    });
  }, []);

  return (
    <div data-name="ViewAccount">
      <Navbar />
      <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto" data-name="settings">
        <div className="grid grid-cols-8 pt-3 mr-10 sm:grid-cols-10">
          <div className="relative my-4 w-56 sm:hidden">
            <input className="peer hidden" type="checkbox" name="select-1" id="select-1" />
          </div>
          <div className="col-span-2 hidden sm:block"></div>
          <div className="col-span-8 overflow-hidden rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
            <div className="pt-4">
              <h1 className="py-2 text-2xl font-semibold">Account Details</h1>
            </div>
            <hr className="mt-4 mb-8" />
            <div className="py-2">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xl font-semibold">Username:</p>
                  <p className="text-gray-600">{username}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">First Name:</p>
                  <p className="text-gray-600">{userInfo?.first_name}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">Last Name:</p>
                  <p className="text-gray-600">{userInfo?.last_name}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">Email Address:</p>
                  <p className="text-gray-600">{userInfo?.email_address}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">Mobile Number:</p>
                  <p className="text-gray-600">{userInfo?.mobile_number}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">City:</p>
                  <p className="text-gray-600">{userInfo?.City}</p>
                </div>
                <div>
                  <p className="text-xl font-semibold">Street Name:</p>
                  <p className="text-gray-600">{userInfo?.Street_name}</p>
                </div>
              </div>
            </div>
            <div>
              <hr className="mt-8 mb-6" />
              <p className="py-2 text-xl font-semibold">Change Password</p>
              <div className="flex items-center">
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                  <label htmlFor="old-password">
                    <span className="text-sm text-gray-500">Current Password</span>
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
                    <span className="text-sm text-gray-500">Confirm new password</span>
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
                className="mt-4 rounded-lg px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-300"
                onClick={changePass}
              >
                Save Password
              </button>
            </div>
            <hr className="mt-8 mb-6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAccount;
