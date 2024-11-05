import React, { useState, useRef } from "react";
import { QrReader } from "react-qr-reader";
import beepSound from "../../assets/beep.mp3"; // Replace with your actual file path
import successSound from "../../assets/success.mp3"; // Replace with your actual file path
import { customeAxios } from "../../api/service/axios";

const ScanUser = () => {
  const [scanResult, setScanResult] = useState(null);
  const lastScannedCodeRef = useRef(null); // Use ref instead of state to track last scanned code
  const [message, setMessage] = useState({ text: "", type: "" });

  const checkCodeInDatabase = async (code) => {
    try {
      const response = await customeAxios.post(`/postAttendance`, {
        UniqueID: code,
      });
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      return { isSuccess: false };
    }
  };

  const handleScan = async (data) => {
    if (data && data !== lastScannedCodeRef.current) {
      setMessage({ text: "", type: "" });

      lastScannedCodeRef.current = data;
      setScanResult(data);

      const response = await checkCodeInDatabase(data);
      if (response.isSuccess) {
        const success = new Audio(successSound);
        success.play();
        setMessage({
          text: `Welcome, ${response.data[0].ParticipantName}!`,
          type: "success",
        });
      } else {
        const beep = new Audio(beepSound);
        beep.play();
        setMessage({
          text: "User is not registered.",
          type: "error",
        });
      }

      setTimeout(() => {
        lastScannedCodeRef.current = null;
      }, 2000);
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <section className="bg-gradient-to-r h-screen from-[#092068]/80 to-[#1ac4fa]/60 relative z-20 py-6 sm:py-8 lg:py-12 flex justify-center items-center">
      <div>
        <h2 className="text-white text-center mb-4">
          Scan QR Code to Mark Attendance
        </h2>
        <QrReader
          delay={300}
          onError={handleError}
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result.text);
            }
          }}
          style={{ width: "100%" }}
        />
        {message.text && (
          <p
            className={`mt-4 text-center ${
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
