import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation if you're using React Router
import { removeCookie } from "../axiosConfig/cookieFunc";
import { logout } from "../store/authSlice";

const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <header className="bg-blue-800 text-white shadow-md py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center flex-wrap">
        {/* Logo or App Name */}
        <Link to="/" className="text-3xl font-extrabold text-white hover:text-blue-200 transition duration-300">
          Hospital Food Manager
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden block text-white focus:outline-none"
          onClick={() => document.getElementById('nav-menu').classList.toggle('hidden')}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

     
     

        {/* Add a call to action or a button */}
        <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center">
          {
            !user ? (
              <a
                href="#login-roles"
                className="px-6 py-3 text-lg font-semibold text-white bg-blue-800 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                LogIn
              </a>
            ) : (
              <button
                onClick={() => {
                  removeCookie('accessToken');
                  dispatch(logout())
                  navigate('/');
                }}
                className="px-6 py-3 text-lg font-semibold text-white bg-blue-800 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                LogOut
              </button>
            )
          }
          
        </div>
      </div>
    </header>
  );
};

export default Header;
