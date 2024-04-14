import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../context/ContextProvider";

const Login = () => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
   const { setCurrentUser, setUserToken } = useStateContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    axiosClient
      .post("user/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setIsLoading(false);
        setCurrentUser(data.user);
        setUserToken(data.token);
        toast.success(`Login Successfully`);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          setIsLoading(false);
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );

          toast.error(`${finalErrors}`);
        }
        console.error(error);
      });
  };

  return (
    <>
      <div className="min-h-screen flex  bg-gray-50 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <form action="" className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    placeholder="jonedoe@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    placeholder="*******"
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />

                  {visible ? (
                    <AiOutlineEye
                      className="absolute right-2 top-2 cursor-pointer"
                      size={20}
                      onClick={() => {
                        setVisible(false);
                      }}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-2 top-2 cursor-pointer"
                      size={20}
                      onClick={() => {
                        setVisible(true);
                      }}
                    />
                  )}
                </div>
              </div>

              <div className={`${styles.normalFlex} justify-between`}>
                <div className={`${styles.normalFlex}`}>
                  <input
                    type="checkbox"
                    name="remeber-me"
                    id="remeber-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remeber-me"
                    className="ml-2 block text-sm text-gray-500"
                  >
                    Remeber me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href=".forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password
                  </a>
                </div>
              </div>
              <div>
                {!isLoading ? (
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Loader />
                  </button>
                )}
              </div>

              <div className={`${styles.normalFlex} w-full`}>
                <h4>Not have an account yet?</h4>
                <Link to={"/sign-up"} className="text-blue-600 pl-2">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
