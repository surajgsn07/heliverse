import React from 'react';
import LandingPage from './components/LandingPage';
import HospitalDashBoard from './components/HospitalDashBoard';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import PantryDashBoard from './components/PantryDashBoard';
import PatientDashBoard from './components/PatientDashBoard';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  );
};

export default App;
