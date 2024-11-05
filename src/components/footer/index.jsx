import React from "react";
import MapEmbed from "../map";

const Footer = () => {
  return (
    <section className="relative z-20 md:px-4 py-10 flex flex-col gap-5 bg-gray-100/10 backdrop-blur-sm  ">
      <MapEmbed />
      <ul className="flex flex-col md:flex-row gap-y-3 justify-center md:justify-between text-left px-3">
        <li className="mb-4 sm:mb-0">
          <h3 className="text-lg  text-gray-800  font-semibold">📅 Date</h3>
          <p className="text-sm  ml-6 ">9th November 2024</p>
        </li>
        <li className="mb-4 sm:mb-0">
          <h3 className="text-lg  text-gray-800  font-semibold">🕗 Time</h3>
          <p className="text-sm  ml-6 ">9:00 AM</p>
        </li>
        <li>
          <h3 className="text-lg  text-gray-800  font-semibold">📍 Venue</h3>
          <p className="text-sm  ml-6 ">
            Alhind Calicut Tower, Indira Gandhi Rd, Arayidathupalam, Kozhikode
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Footer;
