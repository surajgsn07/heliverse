import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="font-sans antialiased bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-center py-32">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold leading-tight sm:text-6xl">
            Effortlessly Manage Meals and Nutrition in Hospitals
          </h1>
          <p className="mt-6 text-xl sm:text-2xl">
            Simplify food management for patients, staff, and visitors with a seamless, intuitive platform.
          </p>
          <a href="#login-roles" className="mt-8 inline-block px-8 py-4 bg-white text-blue-800 font-semibold rounded-lg shadow-lg hover:bg-blue-200 transition-all duration-300">
            Get Started
          </a>
        </div>
      </section>

      

      {/* Login Buttons Section */}
      {!user && (
      <section id="login-roles" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800">Login as</h2>
          <p className="mt-4 text-lg text-gray-600">
            Select your role to log in and get started.
          </p>
          <div className="mt-12 px-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Hospital Manager Login */}
            <div>
              <Link to="/manager-login" className="block px-8 py-4 bg-blue-800 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
                Hospital Manager
              </Link>
            </div>
            
            {/* Pantry Login */}
            <div>
              <Link to="/pantry-login" className="block px-8 py-4 bg-blue-800 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
                Pantry
              </Link>
            </div>
            {/* Deliveryman Login */}
            <div>
              <Link to="/delivery-login" className="block px-8 py-4 bg-blue-800 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
                Deliveryman
              </Link>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Key Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800">Key Features</h2>
          <p className="mt-4 text-lg text-gray-600">
            Our platform offers essential features to help hospitals streamline meal management.
          </p>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="mb-6 text-5xl text-blue-600">
                <i className="fas fa-utensils"></i>
              </div>
              <h3 className="text-2xl font-semibold text-blue-800">Meal Planning</h3>
              <p className="mt-3 text-gray-600">Easily plan and prepare meals based on dietary requirements for different patient needs.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="mb-6 text-5xl text-blue-600">
                <i className="fas fa-calendar-check"></i>
              </div>
              <h3 className="text-2xl font-semibold text-blue-800">Scheduling</h3>
              <p className="mt-3 text-gray-600">Schedule meal deliveries for patients, staff, and visitors with ease and precision.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="mb-6 text-5xl text-blue-600">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-2xl font-semibold text-blue-800">Nutritional Tracking</h3>
              <p className="mt-3 text-gray-600">Track nutritional intake and ensure meals meet the health needs of patients and staff.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800">About Hospital Food Manager</h2>
          <p className="mt-4 text-lg text-gray-600">
            Hospital Food Manager is designed to simplify and optimize food service operations for hospitals. 
            It helps healthcare providers manage meal planning, scheduling, and nutritional tracking efficiently, ensuring that patients and staff get the best meal service possible.
          </p>
          <a href="#features" className="mt-6 inline-block px-8 py-4 bg-blue-800 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all duration-300">
            Discover More
          </a>
        </div>
      </section>


    </div>
  );
};

export default LandingPage;
