import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <header className="bg-slate-200 shadow-md w-full">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        {/* logo */}
        <Link to={"/"}>
          <h1 className="font-bold text-sm sm:text-xl">
            <span className="text-slate-500">RealtyListing.com</span>
          </h1>
        </Link>
        {/* Search */}
        <form className="bg-slate-100 p-3 rounded-lg flex justify-between items-center w-24 sm:w-64">
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none"
          />
          <FaSearch />
        </form>
        {/* Menu */}
        <ul className="flex gap-5">
          <Link to={"/"}>
            <li className="hidden sm:inline hover:text-slate-600">Home</li>
          </Link>
          <Link to={"/about"}>
            <li className="hidden sm:inline hover:text-slate-600">About</li>
          </Link>
          <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src="https://www.w3schools.com/w3images/avatar2.png"
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
