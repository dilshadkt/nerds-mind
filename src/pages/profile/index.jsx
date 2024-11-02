import React, { useState } from "react";
import { motion } from "framer-motion";
import Pipe from "../../assets/images/pipe.png";
import { profileMemberes } from "../../constants";

const Profile = () => {
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const toggleDescription = (index) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section>
      <div className="bg-gradient-to-r from-[#092068]/80 to-[#1ac4fa]/60 relative z-20 py-6 sm:py-8 lg:py-12">
        <div className="mx-auto pt-20 pb-28 relative z-50 max-w-screen-xl px-4 md:px-8">
          <motion.div
            className="mb-10 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-4 text-center text-2xl font-bold text-white font-mono md:mb-6 lg:text-3xl">
              Our Honored Guests
            </h2>

            <p className="mx-auto max-w-screen-md text-center text-gray-800 md:text-lg">
              We’re honored to welcome distinguished guests who bring valuable
              knowledge, experience, and inspiration to our event. Their
              presence embodies collaboration and excellence, and we eagerly
              await the insights they’ll share
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {profileMemberes.map((member, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center rounded-lg bg-gray-100/20 backdrop-blur-sm p-4 lg:p-8"
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-200 shadow-lg md:mb-4 md:h-32 md:w-32">
                  <img
                    src={member.image}
                    loading="lazy"
                    alt={`Photo of ${member.name}`}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div>
                  <div className="text-center font-bold text-gray-700 md:text-lg">
                    {member.name}
                  </div>
                  <p className=" text-center mb-2 font-medium text-sm text-gray-600 md:mb-2 md:text-base">
                    {member?.cmpny}
                  </p>
                  <p className="mb-3 text-center text-xs text-gray-600 md:mb-4 md:text-sm">
                    [ {member.role}]
                  </p>
                  <motion.div
                    className="relative"
                    initial={false}
                    animate={{ height: "auto" }}
                  >
                    <p className="mb-3 text-center text-xs leading-5 text-gray-600  md:text-base">
                      {expandedDescriptions[index]
                        ? member.desc
                        : `${member.desc.slice(0, 50)}...`}
                    </p>
                    {member.desc.length > 100 && (
                      <motion.button
                        onClick={() => toggleDescription(index)}
                        className="text-blue-500 hover:text-blue-700 text-xs md:text-sm font-medium transition-colors duration-200"
                        whileHover={{ scale: 1.05 }}
                      >
                        {expandedDescriptions[index]
                          ? "Read Less"
                          : "Read More"}
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="fixed top-[60%] left-0 right-0 m-auto w-fit">
          <img
            src={Pipe}
            alt="holo"
            className="w-[200px] md:w-[300px] opacity-75 smooth-up-down"
          />
        </div>
      </div>
    </section>
  );
};

export default Profile;
