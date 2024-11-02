import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LoadingContext } from "../../context/loading";

const Confirmation = () => {
  const { successRegister } = useContext(LoadingContext);
  return (
    <section
      className="h-screen bg-gradient-to-r flex-col gap-7
     from-[#092068]/80 to-[#1ac4fa]/60 flex items-center justify-center"
    >
      <p className="w-[90%] text-white md:text-lg  md:w-1/2 text-center font-medium leading-8">
        Thank you for registering for Illuminaite 2024. We will follow up soon
        with a confirmation <span className="font-semibold">Email</span>{" "}
        regarding your registration.
      </p>
      <Link
        to={"/"}
        className="relative group border border-white/50 py-2 text-xs md:text-sm px-6 shadow-md
   text-white/90 transition-all duration-300 hover:text-white hover:border-white"
      >
        <span className="relative z-10">OK</span>
        <div className="absolute inset-0 -z-10 group-hover:bg-white/10 transition-all duration-300"></div>
        <div className="absolute inset-0 -z-10 group-hover:blur-lg transition-all duration-300 group-hover:bg-white/10"></div>
        <div className="absolute inset-0 -z-10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 rounded-sm"></div>
      </Link>
    </section>
  );
};

export default Confirmation;
