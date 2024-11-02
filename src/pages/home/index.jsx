import React from "react";
import { useEffect, useState } from "react";
import hero1 from "../../assets/images/hero1.webp";
import hero2 from "../../assets/images/hero2.webp";
import hero3 from "../../assets/images/hero3.webp";
import SocailMediaIcons from "./socaiMedia";
const HomePage = () => {
  const heroImage = [hero3, hero1, hero2];
  const [image, setImage] = useState(heroImage[0]);
  const [currentImage, setCurrentImage] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImage.length);
    }, 8000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setImage(heroImage[currentImage]);
  }, [currentImage]);
  return (
    <section>
      <div className=" sticky top-0 bg-gray-100 overflow-y-hidden ">
        <div className="w-full">
          <div className="  h-screen   overflow-hidden relative rounded-b-lg bg-gray-900  mx-auto flex flex-col items-center pt-12 sm:pt-24 pb-24 sm:pb-32 md:pb-48 lg:pb-56 xl:pb-64">
            <img
              src={image}
              alt="hero"
              className="absolute scale-up z-0 w-full h-full object-cover top-0 opacity-60"
            />
            <img
              className="hidden md:block mr-2 lg:mr-12 mt-2 lg:mt-12 absolute right-0 top-0"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg2.svg"
              alt="bg"
            />
            <img
              className="ml-2 lg:ml-12 mb-2 lg:mb-12 absolute bottom-0 left-0"
              src="https://tuk-cdn.s3.amazonaws.com/can-uploader/center_aligned_with_image-svg3.svg"
              alt="bg"
            />
            <div
              className="z-50 w-full bottom-0 top-0  my-auto
             flex flex-col justify-center items-center md:items-start   absolute left-0 md:left-16 
           sm:w-2/3 mb-5 sm:mb-10   mt-28"
            >
              <h1
                className="relative text-5xl  md:text-7xl  xl:text-8xl 
        font-semibold leading-tight"
              >
                <div className="relative">
                  {/* Base text layer */}
                  <span className="absolute text-white/50">
                    ILLUMIN
                    <span className="font-bold text-[#1ac4fa]/50 bg-gray-800  px-1 py-1 rounded-lg shadow-md ">
                      AI
                    </span>
                    TE
                  </span>

                  {/* Glowing text layer */}
                  <span className="relative mix-blend-overlay">
                    <span className="relative text-white/85 animate-[textGlow_3s_ease-in-out_infinite]">
                      ILLUMIN
                      <span className="relative font-bold text-[#1ac4fa] px-1 py-1 rounded-lg shadow-md animate-[textGlow_3s_ease-in-out_infinite]">
                        AI
                      </span>
                      TE
                    </span>
                  </span>
                </div>
              </h1>
              <p className="text-white/85 mt-3 md:mt-8 md:text-lg font-mono w-[90%] md:w-[80%]">
                {/* Where the innovation meets imagination */}
                Experience a day of transformative insights at Illuminaite 2024.
                This event brings together industry leaders to delve into the
                forefront of AI, cybersecurity, and digital
                innovation.Illuminaite 2024 offers unparalleled opportunities to
                engage with those shaping the future of technology. Don’t miss
                this chance to connect, learn, and advance with the
                industry’s best.
              </p>
              {/* <TypingEffect /> */}
            </div>
          </div>
        </div>
        <SocailMediaIcons />
      </div>
    </section>
  );
};

export default HomePage;
