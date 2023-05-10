import React from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "./HomepageComponents/components/footer/Footer";
import { Navbar } from "./HomepageComponents/components/navbar/Navbar";

const WithNavFoot = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default WithNavFoot