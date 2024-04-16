import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axiosClient";
import { useNavigate } from "react-router-dom";

const ExamPortal = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [isQuestionEnd, setIsQuestionEnd] = useState(false);
  const [isTestEnd, setIsTestEnd] = useState(false);
  const [canChangeSubject, setCanChangeSubject] = useState(false);
  const [subjects, setSubjects] = useState(null);
  const [completedSubjects, setCompletedSubjects] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [time, setTime] = useState(1800); // 30 minutes in second
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState([]);


  const SCORE_PER_QUESTION = 2;
  const [score, setScore] = useState(0)
 

  const { currentUser } = useStateContext();

  useEffect(() => {
    if (currentUser.type === 'admin') {
      return navigate("/admin-dashboard");
    }
    axiosClient.get("student/get-subjects").then((data) => {
      setSubjects(data.data);
    });

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          // Handle timer expiration, e.g., submit the exam
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Convert time remaining to minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleSelectSubject = (selectedSubjects) => {
    if (completedSubjects?.includes(selectedSubjects)) {
      return;
    }
    if (canChangeSubject === false) {
      return;
    }

    if (selectedSubjects !== "") {
      setCurrentQuestion(0);
      setIsLoading(true);
      setIsQuestionEnd(false);
      axiosClient
        .get(`student/questions/${selectedSubjects}`)
        .then((d) => {
          setIsLoading(false);
          const { data } = d.data;
          setQuestions(shuffleArray(data));
          setOptions(shuffleArray(data[0]?.options));
          setCanChangeSubject(true);
          setCompletedSubjects((prevSubject) => [
            ...prevSubject,
            selectedSubjects,
          ]);
        })
        .catch((e) => {
          toast.error("Error fetching  questions!");
        });
    }
  };

  const handleSelectAnswer = (option, answer, subject_id) => {
    if(isQuestionEnd){return;}
    if (answer === option) {
      setScore(score + SCORE_PER_QUESTION);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setOptions(shuffleArray(questions[currentQuestion + 1]?.options));
    } else {
      const {id,name} = subjects.filter((sub) => sub.id === subject_id)[0];

      toast.info(
        `Completed ${name} test, Selected another subject to continue or submit test`
      );
      setCanChangeSubject(false);
      setIsQuestionEnd(true);
      setResult((prev) => [
        ...prev,
        {
          subject_id: id,
          score: score,
        },
      ]);
    }
  };

  const handleSubmit = ()=>{
    setIsLoading(true);
    axiosClient
    .post(`student/submit-core`, {result})
    .then(() => {
      setCanChangeSubject(false);
      setIsLoading(false);
      setQuestions([]);
      setTime(1800);
      setIsTestEnd(true);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Error submitting  test!");
      });
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="w-full mb-40 px-[30px] sm:px-[40px] md:px-[55px] lg:px-[70px]">
        <div className="relative w-[95%]  border rounded-lg  p-3 flex flex-col mx-auto mt-10">
          <h4 className="font-[400] text-blue-600 text-[20px] capitalize">
            Student: {currentUser?.name}
          </h4>

          <div className="w-[85%] pb-5 mx-auto">
            <div className="my-4 flex justify-between">
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Select Subject:
                </label>
                <select
                  disabled={canChangeSubject}
                  id="subject"
                  className="block p-2.5 w-[95%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 capitalize"
                  onChange={(e) => handleSelectSubject(e.target.value)}
                >
                  <option>-- Select Subject --</option>
                  {subjects &&
                    subjects.map((i, index) => (
                      <option key={i.id} value={i.id}>
                        {i.name}
                      </option>
                    ))}
                </select>
              </div>

              {questions.length > 0 && (
                <h1 className="font-[600] text-blue-600 text-[30px] capitalize">
                  Time Remaining: {minutes < 10 ? "0" + minutes : minutes}:
                  {seconds < 10 ? "0" + seconds : seconds}
                </h1>
              )}

              {questions.length > 0 && (
                <h1 className="font-[600] text-blue-600 text-[30px] capitalize">
                  {currentQuestion + 1}
                </h1>
              )}
            </div>

            {questions.length > 0 ? (
              <>
                <div className="my-12">
                  <div
                    id="question"
                    className="block p-2.5 w-full h-[110px] text-[27px] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter Question Here..."
                  >
                    {questions[currentQuestion]?.question}
                  </div>
                </div>
                <ul className="my-4">
                  {options &&
                    options.map((i, index) => (
                      <li
                        key={index}
                        onClick={() =>
                          handleSelectAnswer(
                            i,
                            questions[currentQuestion]?.answer,
                            questions[currentQuestion]?.subject_id
                          )
                        }
                        className="block p-2.5 w-full text-[1.2rem] text-gray-900 bg-gray-50 rounded-lg border border-gray-300 my-3 hover:bg-blue-700 hover:text-gray-200 ease-in cursor-pointer"
                      >
                        {i}
                      </li>
                    ))}
                </ul>
              </>
            ) : null}

            {questions.length > 0 && (
              <div className="flex items-center justify-center w-full">
                <button
                  type="button"
                  className="block w-full mt-4 text-white bg-blue-700 hover:border hover:border-blue-800 hover:bg-transparent hover:text-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800 capitalize"
                  onClick={() => handleSubmit()}
                >
                  submit
                </button>
              </div>
            )}
          </div>

          {questions.length === 0 && (
            <div className="w-full flex justify-center py-10">
              {isTestEnd === false ? (
                <h1 className="text-6xl font-bold text-black dark:text-gray-800">
                  Select a subject to start!
                </h1>
              ) : (
                <h1 className="text-6xl font-bold text-black dark:text-gray-800">
                  Thank you for particapating in the test!
                </h1>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExamPortal;
