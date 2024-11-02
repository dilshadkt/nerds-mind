import React from "react";
import { QRCodeSVG } from "qrcode.react";
import topleft from "../../../assets/images/topleft.webp";
import Nerdz from "../../../assets/images/Nerdz Minds.png";
import illuminaite from "../../../assets/images/illuminaite.png";
import topright from "../../../assets/images/topright.webp";
const TopPart = ({ userData, registerId }) => {
  const qrValue = `${registerId}`;

  return (
    <div className="h-full w-full">
      <div className="h-full w-full grid grid-cols-2 font-montserrat">
        {/* Left Section */}
        <div className="h-full relative overflow-hidden">
          <img
            src={topleft}
            alt="banner1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 z-20">
            {/* Top Logos */}
            <div className="absolute top-2 w-full px-4 flex justify-between items-center">
              <img
                src={Nerdz}
                alt="Left Logo"
                className="w-24 h-auto object-contain"
              />
              <img
                src={illuminaite}
                alt="Right Logo"
                className="w-24 h-auto object-contain"
              />
            </div>

            {/* Date Section */}
            <div className="absolute top-44 right-0 px-5 text-white font-semibold">
              <h1 className="text-right">09/11/2024</h1>
              <h1 className="text-right">SATURDAY</h1>
            </div>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              {/* Dynamic QR Code */}
              <div className="mb-8 bg-white p-3 rounded-lg">
                {registerId ? (
                  <QRCodeSVG
                    value={qrValue}
                    size={160}
                    level="H"
                    includeMargin={true}
                  />
                ) : (
                  <div className="h-40 w-40 flex items-center justify-center text-gray-500">
                    No QR Code Available
                  </div>
                )}
              </div>

              {/* User Details */}
              <div className="flex flex-col items-center gap-5 px-4 text-center">
                <h1 className="text-4xl font-bold break-words max-w-[90%]">
                  {userData?.ParticipantName}
                </h1>
                <div className="text-2xl font-semibold max-w-[80%] break-words">
                  {userData?.CollegeName}
                </div>
                <h1 className="text-4xl font-semibold break-words max-w-[90%]">
                  {userData?.Designation}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="h-full overflow-hidden">
          <img
            src={topright}
            alt="banner1"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default TopPart;
