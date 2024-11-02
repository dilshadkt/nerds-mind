import React, { useContext } from "react";
import { Link } from "react-router-dom";
import robot from "../../assets/images/robot.png";
import confrimRobot from "../../assets/images/robotConfirm.png";
import { LoadingContext } from "../../context/loading";

const Robot = () => {
  const { isLoading, successRegister } = useContext(LoadingContext);
  return (
    <>
      {isLoading && (
        <div className="fixed top-0 bottom-0 left-0 right-0 z-50 h-screen w-full bg-black/60"></div>
      )}
      <div
        className={`fixed ${
          isLoading ? `bottom-1/3 right-[45%]` : `bottom-6  right-4`
        }  smooth-up-down  z-50  transition-all duration-300 `}
      >
        <div className="relative group">
          <img
            src={successRegister ? confrimRobot : robot}
            alt="robot"
            className="cursor-pointer w-12 hover:translate-y-3 
      transition-all duration-300 "
          />
          <div
            className={`${
              isLoading ? `hidden` : `block`
            }  scale-0 group-hover:scale-100 
      transition-all duration-300
      absolute w-[100px] p-3 text-xs text-gray-800 h-fit
      bg-white rounded-lg shadow-lg -top-[70px] right-[10px]`}
          >
            Hey click here to{" "}
            <Link to={"/auth/login"} className="text-blue-500 underline">
              register
            </Link>
          </div>
          <div
            className={`${isLoading || successRegister ? `block` : `hidden`}  
      transition-all duration-300
      absolute w-fit p-3 text-xs text-gray-800 h-fit
      bg-white rounded-lg shadow-lg -top-[40px] right-[10px]`}
          >
            {successRegister ? `Thanks...` : ` Please wait...`}
          </div>
        </div>
      </div>
    </>
  );
};

export default Robot;
