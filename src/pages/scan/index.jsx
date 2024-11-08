import React, { useState, useRef, useCallback } from "react";
import QrScanner from "react-qr-scanner";
import beepSound from "../../assets/beep.mp3";
import successSound from "../../assets/success.mp3";
import { customeAxios } from "../../api/service/axios";
import { checkCodeInDatabase } from "../../api/service";

const ScanUser = () => {
  const [scanResult, setScanResult] = useState(null);
  const lastScannedTimeRef = useRef(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isScanning, setIsScanning] = useState(true);
  const [showAlert, setShowAlert] = useState(false);

  // const handleScan = useCallback(async (result) => {
  //   const data = result?.text;
  //   // Check if we're currently scanning and if enough time has passed since last scan
  //   const now = Date.now();
  //   if (
  //     !data ||
  //     !isScanning ||
  //     (lastScannedTimeRef.current && now - lastScannedTimeRef.current < 2000)
  //   ) {
  //     return;
  //   }

  //   // Update last scanned time
  //   lastScannedTimeRef.current = now;
  //   setIsScanning(false);

  //   try {
  //     setScanResult(data);
  //     const response = await checkCodeInDatabase(data);

  //     if (response.isSuccess) {
  //       const success = new Audio(successSound);
  //       success.play();
  //       setMessage({
  //         text: `Welcome, ${response.data[0].ParticipantName}!`,
  //         type: "success",
  //       });
  //     } else {
  //       const beep = new Audio(beepSound);
  //       beep.play();
  //       setMessage({
  //         text: "User is not registered.",
  //         type: "error",
  //       });
  //     }

  //     // Reset scanning after delay
  //     setTimeout(() => {
  //       setIsScanning(true);
  //       setMessage({ text: "", type: "" });
  //     }, 2000);
  //   } catch (error) {
  //     console.error("Scanning error:", error);
  //     setMessage({
  //       text: "Error processing scan.",
  //       type: "error",
  //     });

  //     setTimeout(() => {
  //       setIsScanning(true);
  //       setMessage({ text: "", type: "" });
  //     }, 2000);
  //   }
  // }, []);

  const handleScan = useCallback(async (result) => {
    const data = result?.text;
    // Check if we're currently scanning and if enough time has passed since last scan
    const now = Date.now();
    if (
      !data ||
      !isScanning ||
      (lastScannedTimeRef.current && now - lastScannedTimeRef.current < 2000)
    ) {
      return;
    }

    // Update last scanned time
    lastScannedTimeRef.current = now;
    setIsScanning(false);

    try {
      setScanResult(data);
      const response = await checkCodeInDatabase(data);

      if (response.isSuccess) {
        const success = new Audio(successSound);
        success.play();
        setMessage({
          text: `Welcome, ${response.data[0].ParticipantName}!`,
          type: "success",
        });

        // Reset scanning after delay for success case
        setTimeout(() => {
          setIsScanning(true);
          setMessage({ text: "", type: "" });
        }, 2000);
      } else {
        const beep = new Audio(beepSound);
        beep.play();
        // setMessage({
        //   text: "User is not registered.",
        //   type: "error",
        // });
        // Turn off scanning and show alert
        setShowAlert(true);
        setIsScanning(false);
      }
    } catch (error) {
      console.error("Scanning error:", error);
      setMessage({
        text: "Error processing scan.",
        type: "error",
      });
      setShowAlert(true);
      setIsScanning(false);
    }
  }, []);
  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
    setMessage({
      text: "Camera error. Please refresh the page.",
      type: "error",
    });
  };
  const handleRetry = () => {
    setShowAlert(false);
    setIsScanning(true);
    setMessage({ text: "", type: "" });
  };

  return (
    <section className="bg-gradient-to-r min-h-screen from-[#092068]/80 to-[#1ac4fa]/60 relative z-20 py-6 sm:py-8 lg:py-12 flex justify-center items-center">
      <div className="w-full max-w-md px-4">
        <h2 className="text-white text-center mb-4">
          Scan QR Code to Mark Attendance
        </h2>

        <div className="relative h-[250px] w-full">
          {!showAlert && (
            <QrScanner
              delay={300}
              onError={handleError}
              onScan={handleScan}
              style={{
                width: "100%",
                height: "250px",
                maxWidth: "400px",
                margin: "0 auto",
                objectFit: "cover",
                position: "absolute", // Add this
                top: 0, // Add this
                left: 0, // Add this
              }}
              constraints={{
                video: {
                  facingMode: "environment",
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                },
              }}
              className="!h-[250px]" // Add this
            />
          )}
          {!isScanning && !showAlert && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white">Processing...</p>
            </div>
          )}
          {showAlert && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg w-full mx-4">
                <div className="flex items-center justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  User Not Found
                </h3>
                <p className="text-gray-600 text-sm md:text-base text-center mb-6">
                  The scanned QR code is not registered in our system. Please
                  verify your registration or contact an administrator.
                </p>
                <button
                  onClick={handleRetry}
                  className="w-full bg-blue-600 text-white py-2 px-4  text-sm md:text-basae
                  rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>

        {message.text && (
          <p
            className={`mt-4 p-3 rounded text-center ${
              message.type === "success"
                ? "text-green-600 bg-green-200/60 backdrop-blur-sm"
                : "text-red-600 bg-red-200/60 backdrop-blur-sm"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </section>
  );
};

export default ScanUser;
