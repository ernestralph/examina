import React, { useState } from "react";
import Navbar from "./Navbar";

const Header = ({ activeHeading }) => {
  const [active, setActive] = useState(false);
  
  // window.addEventListener("scroll", () => {
  //   if (window.scrollY > 70) {
  //     setActive(true);
  //   } else {
  //     setActive(false);
  //   }
  // }, false);
  return (
    <>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition flex items-center justify-center w-full bg-[#3321c8] h-[70px]`}
      >
        <Navbar />
      </div>
    </>
  );
};

export default Header;
