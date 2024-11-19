import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";
import Robot from "../../components/navbar/robot";

const HomeLayout = () => {
  return (
    <section className="font-montserrat">
      {/* <Navbar /> */}
      <Outlet />
      {/* <Robot /> */}
    </section>
  );
};

export default HomeLayout;
