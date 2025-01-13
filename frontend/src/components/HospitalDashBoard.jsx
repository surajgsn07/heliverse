import React, { useState } from 'react';
import Sidebar from './HospitalDashBoard/Sidebar';
import PantryList from './HospitalDashBoard/Pantries';
import { FaBars } from 'react-icons/fa';

const HospitalDashBoard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
    <Sidebar/>
    </>
  );
};

export default HospitalDashBoard;
