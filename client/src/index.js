import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css";
import router from "./router.jsx";
import { RouterProvider } from "react-router-dom";
import { ContextProvider } from "./context/ContextProvider";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);