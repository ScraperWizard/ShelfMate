import React, { useState } from "react";
import socket from "../../Socket";
import SettingsPanel from "../../components/settings/settingsModal";
import { useAuth } from "../../context/AuthProvider";

function SettingsLib() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newpasswordConfirm, setConfirmPassword] = useState("");
  const { username } = useAuth();

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

  return (
    <div data-name="Settings">
      <SettingsPanel>
        <div className="pt-4">
          <h1 className="py-2 text-2xl font-semibold">Account settings</h1>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Your username</p>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-gray-600">
            Your username is <strong>{username}</strong>
          </p>
          <button className="inline-flex text-blue-600 underline decoration-2 bg-inherit">
            Change
          </button>
        </div>
        <hr className="mt-4 mb-8" />
        <p className="py-2 text-xl font-semibold">Password</p>
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
      </SettingsPanel>
    </div>
  );
}

export default SettingsLib;
