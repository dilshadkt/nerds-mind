import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
const Navbar = () => {
  return (
    <nav className="fixed h-[80px] px-4 md:px-14 font-sans backdrop-blur-md flex items-center justify-between bg-white/10  top-0 left-0 right-0 z-50 w-full">
      <div className="flex items-center  justify-start gap-10 md:gap-20">
        <Link to={"/"}>
          <img src={Logo} alt="logo" className=" w-[80px] md:w-[100px]" />
        </Link>
        <div className="flex items-center justify-center">
          <ul className="flex items-center font-mono text-xs md:text-base justify-center gap-5 md:gap-8">
            <Link to={"/agenda"}>
              <li className="relative group cursor-pointer md:w-20 ">
                <span className="text-white/45   transition-all duration-300 group-hover:text-white group-hover:font-semibold">
                  AGENDA
                </span>
                {/* Glow effect */}
                <span className="absolute inset-0 group-hover:bg-white/20 group-hover:blur-lg -z-10 transition-all duration-300 rounded-lg"></span>
                {/* Text shadow for additional glow */}
                <span
                  className="absolute inset-0   text-white/45 group-hover:text-white
         group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:font-semibold"
                >
                  AGENDA
                </span>
              </li>
            </Link>
            <Link to={"/profile"}>
              <li className="relative group cursor-pointer">
                <span className="text-white/45   transition-all duration-300 group-hover:text-white group-hover:font-semibold">
                  PROFILE
                </span>
                {/* Glow effect */}
                <span className="absolute inset-0 group-hover:bg-white/20 group-hover:blur-lg -z-10 transition-all duration-300 rounded-lg"></span>
                {/* Text shadow for additional glow */}
                <span className="absolute inset-0   text-white/45 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] transition-all duration-300 group-hover:font-semibold">
                  PROFILE
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </div>

      <Link
        to={"/auth/login"}
        className="relative group border border-white/50 py-2 text-xs md:text-sm px-6 shadow-md
   text-white/90 transition-all duration-300 hover:text-white hover:border-white"
      >
        <span className="relative z-10">REGISTER</span>
        <div className="absolute inset-0 -z-10 group-hover:bg-white/10 transition-all duration-300"></div>
        <div className="absolute inset-0 -z-10 group-hover:blur-lg transition-all duration-300 group-hover:bg-white/10"></div>
        <div className="absolute inset-0 -z-10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all duration-300 rounded-sm"></div>
      </Link>
    </nav>
  );
};

export default Navbar;
