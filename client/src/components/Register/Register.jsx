import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosClient from "../../axiosClient";
import Loader from "../Loader/Loader";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (type === ''){
      toast.warning("Select a user account type to continue...");
      setIsLoading(false)
      return;
    }

    axiosClient
      .post("user/register", {
        name,
        type,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        setIsLoading(false);
        toast.success(
          `Registration Sucessful!`
        );

        navigate("/login");
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
      <div className=" flex  bg-gray-50 flex-col justify-center py-6 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
            Register
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    value={name}
                    placeholder="jone doe"
                    onChange={(e) => setName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
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
              <div>
                <label
                  htmlFor="cPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    type={visible ? "text" : "password"}
                    name="cPassword"
                    id="cPassword"
                    autoComplete="current-password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
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

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Register as:
                </label>
                <div className="mt-1 flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="admin"
                    placeholder="e.g +23485577432"
                    onChange={(e) => setType(e.target.value)}
                    className=" px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none mr-1"
                  />
                  <span>Admin</span>
                </div>
                <div className="mt-1 flex items-center">
                  <input
                    type="radio"
                    name="type"
                    value="student"
                    placeholder="e.g +23485577432"
                    onChange={(e) => setType(e.target.value)}
                    className=" px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none mr-1"
                  />
                  <span>Student</span>
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
                    disabled
                    type="submit"
                    className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                  >
                    <Loader />
                  </button>
                )}
              </div>

              <div className={`${styles.normalFlex} w-full`}>
                <h4>Already have an account?</h4>
                <Link to={"/login"} className="text-blue-600 pl-2">
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
