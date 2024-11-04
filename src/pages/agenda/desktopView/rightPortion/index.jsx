import React from "react";
import { motion } from "framer-motion";
import Two from "../../../../assets/images/agenda/02.png";
import Five from "../../../../assets/images/agenda/05.png";
import Six from "../../../../assets/images/agenda/06.png";
import Eight from "../../../../assets/images/agenda/08.png";

const aboutVarientsRight = {
  hidden: { opacity: 0, x: 200 },
  visible: { opacity: 1, x: 0 },
};
const RightPortion = () => {
  return (
    <div className="flex flex-col items-center md:items-start md:pl-12 lg:border-gray-400 mt-20 md:mt-0 md:w-1/2">
      <div aria-label={"1"} role="img">
        <div
          className="w-[50px]  aspect-square rounded-full border-2 border-dashed
flex items-center justify-center font-semibold text-xl border-white  text-white"
        >
          1
        </div>
      </div>
      <div className="flex mt-6 flex-col items-center md:items-start md:w-8/12">
        <h1 className="focus:outline-none  leading-8 capitalize text-xl font-medium  text-gray-900">
          Registration
        </h1>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          [9:00 AM - 9:40 AM]
        </h2>
      </div>
      <motion.div
        variants={aboutVarientsRight}
        initial="hidden"
        whileInView="visible"
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
          delay: 0.15,
          ease: "easeInOut",
          duration: 0.25,
        }}
        viewport={{ once: true }}
        aria-label="wallet"
        role="img"
      >
        <img
          className="focus:outline-none mt-32 w-24 md:w-36"
          src={Two}
          alt=""
        />
      </motion.div>
      <div aria-label={"3"} role="img">
        <div
          className="w-[50px] mt-32 aspect-square rounded-full border-2 border-dashed
flex items-center justify-center font-semibold text-xl border-white  text-white"
        >
          3
        </div>
      </div>
      <div className="flex mt-6 flex-col items-center md:items-start md:w-8/12">
        <h1 className="focus:outline-none  leading-8 capitalize text-xl font-medium  text-gray-900">
          Intro - NerdzMinds
        </h1>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          Sankaranarayanan V C
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          GM, Sacrosys India
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          [9:50 AM - 10:20 AM]
        </h2>
      </div>
      <motion.div
        variants={aboutVarientsRight}
        initial="hidden"
        whileInView="visible"
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
          delay: 0.15,
          ease: "easeInOut",
          duration: 0.25,
        }}
        viewport={{ once: true }}
        aria-label="wallet"
        role="img"
      >
        <img
          className="focus:outline-none mt-24 w-24 md:w-36    "
          src={Five}
          alt=""
        />
      </motion.div>
      <div aria-label={"3"} role="img">
        <div
          className="w-[50px] mt-32 aspect-square rounded-full border-2 border-dashed
flex items-center justify-center font-semibold text-xl border-white  text-white"
        >
          5
        </div>
      </div>
      <div className="flex mt-6 flex-col items-center md:items-start md:w-8/12">
        <h1 className="focus:outline-none  leading-8 capitalize text-xl font-medium  text-gray-900">
          Generative AI in Action: Real-World Use Cases and Applications
        </h1>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          Jayadev Vasantham
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          CTO, IndustryApps, Singapore
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          [11:00 AM - 11:40 AM]
        </h2>
      </div>
      <motion.div
        variants={aboutVarientsRight}
        initial="hidden"
        whileInView="visible"
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
          delay: 0.15,
          ease: "easeInOut",
          duration: 0.25,
        }}
        viewport={{ once: true }}
        aria-label="wallet"
        role="img"
      >
        <img
          className="focus:outline-none mt-24 w-24 md:w-36    "
          src={Eight}
          alt=""
        />
      </motion.div>
      <div aria-label={"3"} role="img">
        <div
          className="w-[50px] mt-32 aspect-square rounded-full border-2 border-dashed
flex items-center justify-center font-semibold text-xl border-white  text-white"
        >
          7
        </div>
      </div>
      <div className="flex mt-6 flex-col items-center md:items-start md:w-8/12">
        <h1 className="focus:outline-none  leading-8 capitalize text-xl font-medium  text-gray-900">
          Lunch
        </h1>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          [12:30 PM - 1:30 PM]
        </h2>
      </div>

      <motion.div
        variants={aboutVarientsRight}
        initial="hidden"
        whileInView="visible"
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
          delay: 0.15,
          ease: "easeInOut",
          duration: 0.25,
        }}
        viewport={{ once: true }}
        aria-label="wallet"
        role="img"
      >
        <img
          className="focus:outline-none mt-32 w-24 md:w-36"
          src={Six}
          alt=""
        />
      </motion.div>
      <div aria-label={"3"} role="img">
        <div
          className="w-[50px] mt-40 aspect-square rounded-full border-2 border-dashed
flex items-center justify-center font-semibold text-xl border-white  text-white"
        >
          9
        </div>
      </div>
      <div className="flex mt-6 flex-col items-center md:items-start md:w-8/12">
        <h1 className="focus:outline-none  leading-8 capitalize text-xl font-medium  text-gray-900">
          Vote of Thanks
        </h1>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          Kiran Ranju
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          Marketing Manager, Scanntek NerdzMinds
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 text-base leading-6 tracking-wide font-mono">
          [1:40 PM - 1:45 PM]
        </h2>
      </div>

      <motion.div
        variants={aboutVarientsRight}
        initial="hidden"
        whileInView="visible"
        transition={{
          type: "spring",
          damping: 10,
          stiffness: 100,
          delay: 0.15,
          ease: "easeInOut",
          duration: 0.25,
        }}
        viewport={{ once: true }}
        aria-label="wallet"
        role="img"
      >
        <img
          className="focus:outline-none mt-24 w-24 md:w-36    "
          src={Six}
          alt=""
        />
      </motion.div>
    </div>
  );
};

export default RightPortion;
