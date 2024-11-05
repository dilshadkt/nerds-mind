import React from "react";

const MapEmbed = () => {
  return (
    <div className="w-full h-[250px] rounded-lg overflow-hidden md:h-[600px] lg:h-[450px]">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d62608.299080322744!2d75.7116902!3d11.260035!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65948e959cf9b%3A0xb4ed3049fa6729b7!2salhind%20Calicut%20Tower!5e0!3m2!1sen!2sin!4v1730726565238!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MapEmbed;
