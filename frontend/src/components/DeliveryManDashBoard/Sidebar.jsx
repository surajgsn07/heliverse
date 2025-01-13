import React, { useState } from 'react';
import { FaBars, FaTimes, FaHistory, FaCartPlus,FaListAlt } from 'react-icons/fa'; // Icons for new fields
import { Link, Outlet, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar on small screens
  const location = useLocation(); // Hook to get the current route for active link styling

  const menuItems = [
    {
      title: 'Delivery History',
      path: "/delivery/dashboard/",
      icon: <FaHistory className="h-5 w-5" />,
    },
    {
      title: 'New Orders',
      path: "/delivery/dashboard/new-orders",
      icon: <FaCartPlus className="h-5 w-5" />,
    },
    {
      title: 'Pending Tasks', // New menu item for Pending Tasks
      path: "/delivery/dashboard/pending-tasks", // Path for the Pending Tasks page
      icon: <FaListAlt className="h-5 w-5" />, // Using a different icon for Pending Tasks
    },
  ];

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-blue-700 text-white fixed lg:static lg:w-1/5 w-64 h-full p-5 transform transition-all duration-300 ease-in-out shadow-lg ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Hospital Manager</h1>
          <button
            className="lg:hidden text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <ul className="space-y-6">
          {menuItems.map((item, index) => (
            <li key={index} className="border-b border-gray-400">
              <Link
                to={item.path}
                className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-blue-600 transition ${
                  location.pathname === item.path ? 'bg-blue-500' : ''
                }`}
              >
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content area */}
      <div className="flex-grow">
        {/* Top Navbar for small screens */}
        <div className="lg:hidden p-4 bg-blue-700 text-white shadow-md flex items-center justify-between">
          <h1 className="text-xl font-bold">Hospital Manager</h1>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none"
          >
            {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>

        {/* Main Content */}
        <div className="p-6 lg:ml-1/5 h-screen" style={{ overflow: 'scroll' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
