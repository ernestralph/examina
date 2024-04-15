import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';


const ExamPortal = () => {
  return (
    <div className="w-full h-[400px] flex   items-center justify-center">
      <div className="relative min-[320px]:w-[290px] min-[400px]:w-[380px] sm:w-[400px] md:w-[500px] lg:w-[600px] h-[250px] border rounded-lg bg-white p-3 flex flex-col  justify-evenly items-center shadow-md">
        <h1 className="font-[900] text-blue-600 font-Poppins text-[28px] italic">
          Examination Portal
        </h1>
      </div>
    </div>
  );
};

export default ExamPortal;
