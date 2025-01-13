import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-lg">&copy; {new Date().getFullYear()} Hospital Food Manager. All Rights Reserved.</p>
        <div className="mt-4 flex justify-center space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition duration-300">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition duration-300">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-200 transition duration-300">
            <i className="fab fa-linkedin-in"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
