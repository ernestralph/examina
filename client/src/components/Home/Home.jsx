import React, { useEffect, useState } from 'react'
import SearchDropdown from '../SearchDropdown/SearchDropdown';
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';


const Home = () => {
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useState('')
  const [searchData, setSearchData] = useState(null);
  

  useEffect(() => {
    if (searchParams.length === 0) {
      setVisible(false);
      setSearchData(null)
    }
  }, [searchParams])
  

  // handle book search
  const handleBookSearch = ()=>{
    setVisible(true);
    setIsLoading(true);
    axios
    .get(`https://www.anapioficeandfire.com/api/books?name=${searchParams}`)
    .then((books) => {
        setIsLoading(false);
        setSearchData(books.data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(`${error}`);
      });
  }
  return (
    <div className="w-full h-[400px] flex   items-center justify-center">
      <div className="relative min-[320px]:w-[290px] min-[400px]:w-[380px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[250px] border rounded-lg bg-white p-3 flex flex-col  justify-evenly items-center shadow-md">
        <h1 className="font-[900] text-blue-600 font-Poppins text-[28px] italic">
          Booki.com
        </h1>
        <div className="w-full flex justify-center mb-20 capitalize">
          <input
            type="search"
            name="search"
            value={searchParams}
            onChange={(e) => setSearchParams(e.target.value)}
            placeholder="Search Your Favorite Books..."
            className="w-[70%] text-[19px] border bg-slate-100 px-3 py-6 rounded-[20px]"
          />
          {!isLoading ? (
            <button
              disabled={searchParams.length === 0}
              className="absolute top-38 max-[401px]:right-[10px]  min-[400px]:right-[60px]  right-[77px] text-[20px] bg-blue-400 px-3 py-6 rounded-[20px] text-white "
              onClick={() => handleBookSearch()}
            >
              Search
            </button>
          ) : (
            <button className="absolute top-38 r max-[401px]:right-[5px]  min-[400px]:right-[60px]  right-[77px] text-[20px] bg-blue-400 px-3 py-6 rounded-[20px] text-white">
              <Loader />
            </button>
          )}
        </div>
        {visible ? <SearchDropdown searchData={searchData} /> : null}
      </div>
    </div>
  );
}

export default Home
