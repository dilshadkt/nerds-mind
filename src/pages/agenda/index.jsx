import React from "react";
import Holo from "../../assets/images/holo.png";
import AgendaDeskTopView from "./desktopView";
import AgendaMobileView from "./mobileView";

const Agenda = () => {
  return (
    <section>
      <div className="overflow-y-hidden pt-20 relative z-20  bg-gradient-to-r from-[#092068]/80 to-[#1ac4fa]/60">
        <div className="mx-auto relative z-50 container f-f-p px-4 xl:px-0 py-14">
          <h1
            className="focus:outline-none font-mono text-center text-3xl lg:text-4xl font-semibold 
         lg:leading-9 tracking-wider text-white"
          >
            AGENDA
          </h1>
          <div className="md:mt-12 f-f-p">
            <AgendaDeskTopView />
            <AgendaMobileView />
          </div>
        </div>
        <div className="fixed hidden md:flex top-[60%] z-50 left-0 right-0 m-auto  w-fit  ">
          <img src={Holo} alt="holo" className="w-10" />
        </div>
        <div className="fixed  md:hidden top-[60%] left-0 right-0 m-auto  w-fit  ">
          <img
            src={Holo}
            alt="holo"
            className="w-[200px] opacity-40 smooth-up-down"
          />
        </div>
      </div>
    </section>
  );
};

export default Agenda;
