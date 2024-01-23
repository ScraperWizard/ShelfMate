import React from "react";
import { ToastContainer, toast, Slide, ToastOptions, ToastPosition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const notifySuccess = () => {
  toast.success("Success", commonAttributes);
};

export const notifyWarning = () => {
  toast.warn("Warning", commonAttributes);
};

export const notifyError = () => {
  toast.error('Error occurred', commonAttributes);
};

const commonAttributes: ToastOptions<unknown> = {
    position: "top-right" as ToastPosition,
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide,
  };

function NotificationProvider() {
  return (
    <>
      <ToastContainer />
    </>
  );
}

export default NotificationProvider;
