import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axiosClient";
import { Link, useNavigate } from "react-router-dom";

const Result = () => {
  const navigate = useNavigate();
 const [isLoading, setIsLoading] = useState(false);
 const [resultData, setResultData] = useState(false);
  
  const { currentUser } = useStateContext();

  useEffect(() => {
    if (currentUser.type === "admin") {
      return navigate("/admin-dashboard");
    }

    axiosClient.get(`student/get-scores/${currentUser.id}`).then((d) => {
      const {data} =  d?.data;
      setResultData(data);
    });
    
  }, [currentUser, navigate]);

  
  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full mb-40 px-[30px] sm:px-[40px] md:px-[55px] lg:px-[70px]">
        <div className="relative w-[95%]  border rounded-lg  p-3 flex flex-col mx-auto mt-10">
          <h4 className="font-[400] text-blue-600 text-[20px] capitalize">
            Student: {currentUser?.name}
          </h4>

          <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="mt-5 w-[90%] mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Subject
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Score
                  </th>
                </tr>
              </thead>
              <tbody>
                {resultData.length
                  ? resultData.map((i, index) => (
                      <>
                        <tr
                          class="border-b   hover:bg-gray-50 dark:hover:bg-gray-600"
                          key={index}
                        >
                          <td class="px-6 py-4 text-[20px] capitalize">{i.subject}</td>
                          <td class="px-6 py-4 text-[20px]">{i.score}</td>
                        </tr>
                      </>
                    ))
                  : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
