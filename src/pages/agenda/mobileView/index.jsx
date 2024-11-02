import React, { Fragment } from "react";
import { timelineData } from "../../../constants";

const AgendaMobileView = () => {
  return (
    <div className="md:hidden flex flex-col items-center w-full">
      {timelineData.map((timeline) => (
        <Fragment key={timeline.id}>
          <img
            className="focus:outline-none mt-10 w-20 md:w-36"
            src={timeline.icon}
            alt="how it work"
          />
          <div
            className=" w-[35px] md:w-[40px] mt-3 aspect-square rounded-full 
      flex items-center justify-center font-semibold md:text-xl border-2 border-dashed
       border-white text-white"
          >
            {timeline.id}
          </div>

          <div className=" mt-3 md:mt-5  flex flex-col items-center">
            <h1
              className="text-lg md:text-xl w-[75%] md:w-full
           leading-7 text-center tracking-wide md:leading-5 font-medium 
           md:font-semibold text-gray-900"
            >
              {timeline.title}
            </h1>
            {timeline?.author && (
              <h2 className="text-gray-800 font-mono font-medium   mt-2 text-center text-base leading-6 tracking-wide">
                {timeline.author}
              </h2>
            )}
            {timeline?.role && (
              <h2 className="text-gray-800 font-medium font-mono   mt-1 text-center text-base leading-6 tracking-wide">
                {timeline.role}
              </h2>
            )}
            <h2 className="text-gray-800 mt-2 text-center text-sm md:text-base leading-6 tracking-wide">
              [{timeline.time}]
            </h2>
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default AgendaMobileView;
