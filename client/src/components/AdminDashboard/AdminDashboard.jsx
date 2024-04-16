import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const  navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([
    "Option1",
    "Option2",
    "Option3",
    "Option4",
  ]);
  const [subjects, setSubjects] = useState(null);
  const [selectedSubjects, setSelectedSubjects] = useState('');
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [file, setFile] = useState(null);

  const { currentUser } = useStateContext();


  useEffect(() => {
    if (currentUser.type === "student") {
      return navigate("/exams-portal");
    }
    axiosClient.get("admin/get-subjects").then((data) => {
      setSubjects(data.data);
    });
  }, []);

  const handleFormSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    if (selectedSubjects.length < 1){
      toast.warning("Select a subject to continue...");
      setIsLoading(false)
      return;
    }

    await axiosClient
      .post("admin/upload-question", {
        selectedSubjects,
        question,
        options,
        answer,
      })
      .then((data) => {
        setIsLoading(false);
        setOptions(["Option1", "Option2", "Option3", "Option4"]);
        setSelectedSubjects(null);
        setQuestion("");
        setAnswer("");
        toast.success(`Successfully saved question`);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error(`Incomplete operation, Kindly try again.`);
      });
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadCSV = async (e)=>{
        e.preventDefault()
        setIsLoading(true)
        try {
          if (selectedSubjects.length < 1) {
            toast.warning("Select a subject to continue...");
            setIsLoading(false);
            return;
          }
            const formData = new FormData();
            formData.append('file', file);
            formData.append("selectedSubjects", selectedSubjects);
            const response = await axiosClient.post(
              "/admin/questions/bulk-upload",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            setIsLoading(false);
            setFile(null);
          } catch (error) {
            setIsLoading(false);
            toast.error(error)
        }
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full mb-40 px-[30px] sm:px-[40px] md:px-[55px] lg:px-[70px]">
        <h6 className="py-3 px-2 text-gray-500 font-300 font-Poppins italic capitalize">
          Dashboard / {currentUser?.name}
        </h6>
        <hr />

        <div className="relative w-[95%]  border rounded-lg  p-3 flex flex-col mx-auto mt-10">
          <h4 className="font-[400] text-blue-600 text-[20px]">
            Upload Examination Questions
          </h4>

          <form className="w-[85%] pb-5 mx-auto" onSubmit={handleFormSubmit}>
            <div className="my-4">
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Select Subject:
              </label>
              <select
                id="subject"
                className="block p-2.5 w-[20%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setSelectedSubjects(e.target.value)}
              >
                <option>-- Select Subject --</option>
                {subjects &&
                  subjects.map((i, index) => (
                    <option key={index} value={i.id}>
                      {i.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="my-4">
              <label
                htmlFor="question"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Question:
              </label>
              <textarea
                id="question"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Question Here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></textarea>
            </div>
            {options &&
              options.map((i, index) => (
                <div className="my-4" key={index}>
                  <label
                    htmlFor={`${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900 "
                  >
                    Enter {i}:
                  </label>
                  <input
                    id={`${index}`}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder={`Enter ${i} Here...`}
                    value={i}
                    onChange={(e) => {
                      const newOptions = [...options];
                      newOptions[index] = e.target.value;
                      setOptions(newOptions);
                    }}
                  />
                </div>
              ))}

            <div className="my-4">
              <label
                htmlFor="answer"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Enter Answer:
              </label>
              <input
                id="answer"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Answer Here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="block w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>

            <div className="my-8 w-[80%] mx-auto">
              <span
                className="mt-3 mr-3 text-sm text-gray-500 dark:text-gray-500"
                id="user_avatar_help"
              >
                You can upload multiple questions in csv file to save time
              </span>
              <input
                onChange={(e) => handleFileChange(e)}
                accept=".csv"
                className=" text-sm text-gray-900 border border-gray-100 rounded-lg cursor-pointer bg-gray-50  focus:outline-none dark:bg-gray-300 dark:border-gray-600 dark:placeholder-gray-400 mr-2"
                aria-describedby="file"
                id="file"
                type="file"
              />

              <button
                onClick={(e) => handleUploadCSV(e)}
                type="button"
                className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 text-center dark:bg-gray-600 dark:hover:bg-gray-800 dark:focus:ring-blue-800 "
              >
                Upload CSV
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
