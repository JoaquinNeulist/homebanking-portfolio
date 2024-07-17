// src/layouts/Mainlayout.jsx
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const Mainlayout = () => {
  return (
    <>
      <Header />
      <main className="main-content min-h-[67.8vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Mainlayout;
