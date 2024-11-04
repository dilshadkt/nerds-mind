import React from "react";
import { motion } from "framer-motion";
import One from "../../../../assets/images/agenda/01.png";
import Three from "../../../../assets/images/agenda/03.png";
import Four from "../../../../assets/images/agenda/04.png";
import Seven from "../../../../assets/images/agenda/07.png";
import Eight from "../../../../assets/images/agenda/08.png";
const aboutVarients = {
  hidden: { opacity: 0, x: -200 },
  visible: { opacity: 1, x: 0 },
};
const LeftPortion = () => {
  return (
    <div
      className="flex  flex-col items-center md:items-end
 md:pr-12 md:border-r-4 border-gray-300 relative md:w-1/2"
    >
      <motion.div
        variants={aboutVarients}
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
        aria-label="sign up"
        role="img"
      >
        <img
          className="focus:outline-none mt-10 w-24 md:w-36"
          src={One}
          alt="how it work"
        />
      </motion.div>
      <div aria-label={"2"} role="img" className="">
        <div
          className="w-[50px] mt-24 aspect-square rounded-full border-2 border-dashed
    flex items-center justify-center font-semibold text-xl border-white  text-white"
        >
          2
        </div>
      </div>
      <div className="flex mt-6 flex-col items-center lg:items-end md:w-8/12">
        <h1 className="focus:outline-none leading-8  capitalize text-xl font-medium  text-gray-900">
          welcome speech
        </h1>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          Subin P S
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          Program Manager, Scanntek NerdzMinds, India
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          [9:40 AM - 9:50 AM]
        </h2>
      </div>
      <motion.div
        variants={aboutVarients}
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
        aria-label="transactions"
        role="img"
      >
        <img
          className="focus:outline-none mt-24 w-24 md:w-36    "
          src={Three}
          alt=""
        />
      </motion.div>
      <div
        className="w-[50px] mt-24 aspect-square rounded-full border-2 border-dashed
    flex items-center justify-center font-semibold text-xl border-white  text-white"
      >
        4
      </div>
      <div className="flex mt-8 flex-col items-center lg:items-end md:w-8/12">
        <h1 className="focus:outline-none leading-8  text-right text-xl font-medium  text-gray-900">
          AI Uncovered: Introduction to Artificial Intelligence
        </h1>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          Akshay PK
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          CTO, Cybosys Technologies, India
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          [10:20 AM - 11:00 AM]
        </h2>
      </div>
      <motion.div
        variants={aboutVarients}
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
        aria-label="transactions"
        role="img"
      >
        <img
          className="focus:outline-none mt-24 w-24 md:w-36    "
          src={Four}
          alt=""
        />
      </motion.div>
      <div
        className="w-[50px] mt-24 aspect-square rounded-full border-2 border-dashed
    flex items-center justify-center font-semibold text-xl border-white  text-white"
      >
        6
      </div>
      <div className="flex mt-8 flex-col items-center lg:items-end md:w-8/12">
        <h1 className="focus:outline-none leading-8  text-xl   text-right font-medium  text-gray-900">
          Bridging the Gap between Academic Learning and Industry Readiness
        </h1>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          Sankaran P V
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          Senior Engineering Manager, RSA India Pvt Ltd
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          [11:40 AM - 12:30 PM]
        </h2>
      </div>
      <motion.div
        variants={aboutVarients}
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
        aria-label="transactions"
        role="img"
      >
        <img
          className="focus:outline-none mt-24 w-24 md:w-36    "
          src={Seven}
          alt=""
        />
      </motion.div>
      <div
        className="w-[50px] mt-32 aspect-square rounded-full border-2 border-dashed
    flex items-center justify-center font-semibold text-xl border-white  text-white"
      >
        8
      </div>
      <div className="flex mt-8 flex-col items-center lg:items-end md:w-8/12">
        <h1 className="focus:outline-none leading-8  text-xl text-right  font-medium  text-gray-900">
          Cloud and New Generation Data Centers
        </h1>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          Satheesan I K
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          CTO, Wriox Infotech, UAE
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          [1:30 PM - 1:40 PM]
        </h2>
      </div>
      <motion.div
        variants={aboutVarients}
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
        aria-label="transactions"
        role="img"
      >
        <img
          className="focus:outline-none mt-24 w-24 md:w-36    "
          src={Eight}
          alt=""
        />
      </motion.div>
      <div
        className="w-[50px] mt-32 aspect-square rounded-full border-2 border-dashed
    flex items-center justify-center font-semibold text-xl border-white  text-white"
      >
        10
      </div>
      <div className="flex mt-8 flex-col items-center lg:items-end md:w-8/12">
        <h1 className="focus:outline-none leading-8  text-xl text-right  font-medium  text-gray-900">
          Hands-On with AI: Practical Insights and Interactive Discussion
        </h1>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          Akshay
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          CTO, Wriox Infotech, UAE
        </h2>
        <h2 className="focus:outline-none text-gray-800 mt-3 pl-3 text-center md:text-left text-base font-mono leading-6 tracking-wide">
          [1:45 PM - 3:30 PM]
        </h2>
      </div>
    </div>
  );
};

export default LeftPortion;
