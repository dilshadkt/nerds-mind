import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Facebook } from "@mui/icons-material";
import { Link } from "react-router-dom";
const SocailMediaIcons = () => {
  return (
    <section className="fixed h-10 z-50 bottom-8 left-6 md:left-14">
      <ul className="flex items-center justify-center gap-3 md:gap-5">
        <Link
          to={"https://www.instagram.com/scanntek.ae?igsh=cnVnaXR1MGhldjgx"}
          target="_blank"
        >
          <li
            className="w-10 aspect-square bg-[#1ac4fa]/10 border border-[#1ac4fa]/20 shadow-md rounded-full 
backdrop-blur-sm transition-all duration-300 cursor-pointer relative
hover:border-[#1ac4fa]/50 hover:shadow-lg hover:bg-[#1ac4fa]/20
after:absolute after:inset-0 flex items-center justify-center after:rounded-full after:blur-md
after:bg-gradient-to-b after:from-[#1ac4fa]/40 after:to-[#092068]/40
after:transition-opacity"
          >
            <InstagramIcon />
          </li>
        </Link>

        <Link
          to={
            "https://www.facebook.com/profile.php?id=61556926785314&sk=about&locale=ga_IE"
          }
          target="_blank"
        >
          <li
            className="w-10 aspect-square bg-[#1ac4fa]/10 border border-[#1ac4fa]/20 shadow-md rounded-full 
backdrop-blur-sm transition-all duration-300 cursor-pointer relative
hover:border-[#1ac4fa]/50 hover:shadow-lg hover:bg-[#1ac4fa]/20
after:absolute after:inset-0 after:rounded-full flex items-center justify-center after:blur-md
after:bg-gradient-to-b after:from-[#1ac4fa]/40 after:to-[#092068]/40
after:transition-opacity"
          >
            <Facebook />
          </li>
        </Link>
        <Link
          to={"https://www.linkedin.com/in/scanntek-branding-a31757310/"}
          target="_blank"
        >
          <li
            className="w-10 aspect-square bg-[#1ac4fa]/10 border border-[#1ac4fa]/20 shadow-md rounded-full 
backdrop-blur-sm transition-all duration-300 cursor-pointer relative
hover:border-[#1ac4fa]/50 hover:shadow-lg hover:bg-[#1ac4fa]/20
after:absolute after:inset-0 after:rounded-full flex items-center justify-center after:blur-md
after:bg-gradient-to-b after:from-[#1ac4fa]/40 after:to-[#092068]/40
after:transition-opacity"
          >
            <LinkedInIcon />
          </li>
        </Link>
      </ul>
    </section>
  );
};

export default SocailMediaIcons;
