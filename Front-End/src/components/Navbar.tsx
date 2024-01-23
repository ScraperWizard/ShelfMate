import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import Logo from "../assets/myLogo.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="fixed w-full h-[60px] flex justify-between items-center px-4 bg-gradient-to-r from-white via-blue-900 to-slate-900 text-gray-300">
      <div>
        <img
          src={Logo}
          alt="Logo Image"
          style={{ width: "100px", height: "100px" }}
        />
      </div>

      <ul className="hidden md:flex justify-between">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Projects</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Skills</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>

      <div onClick={handleClick} className="md:hidden z-10">
        {!nav ? <FaBars /> : <FaTimes />}
      </div>

      <ul
        className={
          !nav
            ? "hidden"
            : "absolute top-0 left-0 w-full h-screen bg-gradient-to-r from-white via-blue-900 to-slate-900 flex flex-col justify-center items-center"
        }
      >
        <li className="py-6 text-4xl">
          <a href="#">Home</a>
        </li>
        <li className="py-6 text-4xl">
          <a href="#">Projects</a>
        </li>
        <li className="py-6 text-4xl">
          {" "}
          <a href="#">About</a>
        </li>
        <li className="py-6 text-4xl">
          {" "}
          <a onClick={handleClick}>Skills</a>
        </li>
        <li className="py-6 text-4xl">
          {" "}
          <a onClick={handleClick}>Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
