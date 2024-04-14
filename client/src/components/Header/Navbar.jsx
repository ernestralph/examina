import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axiosClient";
import { toast } from "react-toastify";

const Navbar = ({ active }) => {
  const { userToken, setCurrentUser, setUserToken } = useStateContext();

  const logout = (ev) => {
    axiosClient.post("/user/logout").then((res) => {
      setCurrentUser({});
      setUserToken(null);
      toast.success(`Logout Successfully`)
    }).catch((error)=>{
      toast.error(`${error}`)
    });
  };
  return (
    <div className={`${styles.normalFlex}`}>
      {userToken && userToken.length ? (
        <>
          <div className="flex">
            <Link
              to="/"
              className={`${
                active === "Home" ? "text-[#17dd1f]" : "text-[#fff]"
              } font[500] px-6 pointer`}
            >
              Home
            </Link>
          </div>
          <div className="flex">
            <button
              onClick={() => logout()}
              className={`${
                active === "Home" ? "text-[#17dd1f]" : "text-[#fff]"
              } font[500] px-6 pointer`}
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex">
            <Link
              to="/login"
              className={`${
                active === "Home" ? "text-[#17dd1f]" : "text-[#fff]"
              } font[500] px-6 pointer`}
            >
              Login
            </Link>
          </div>
          <div className="flex">
            <Link
              to="/register"
              className={`${
                active === "Home" ? "text-[#17dd1f]" : "text-[#fff]"
              } font[500] px-6 pointer`}
            >
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
