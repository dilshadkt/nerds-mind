// import React, { useState, useRef } from "react";
// import { QrReader } from "react-qr-reader";
// import beepSound from "../../assets/beep.mp3";
// import successSound from "../../assets/success.mp3";
// import { customeAxios } from "../../api/service/axios";

// const ScanUser = () => {
//   const [scanResult, setScanResult] = useState(null);
//   const lastScannedCodeRef = useRef(null);
//   const [message, setMessage] = useState({ text: "", type: "" });

//   const checkCodeInDatabase = async (code) => {
//     try {
//       const response = await customeAxios.post(`/postAttendance`, {
//         UniqueID: code,
//       });
//       return response.data;
//     } catch (error) {
//       console.error("API Error:", error);
//       return { isSuccess: false };
//     }
//   };
//   //chnages
//   const handleScan = async (data) => {
//     if (data && data !== lastScannedCodeRef.current) {
//       setMessage({ text: "", type: "" });

//       lastScannedCodeRef.current = data;
//       setScanResult(data);

//       const response = await checkCodeInDatabase(data);
//       if (response.isSuccess) {
//         const success = new Audio(successSound);
//         success.play();
//         setMessage({
//           text: `Welcome, ${response.data[0].ParticipantName}!`,
//           type: "success",
//         });
//       } else {
//         const beep = new Audio(beepSound);
//         beep.play();
//         setMessage({
//           text: "User is not registered.",
//           type: "error",
//         });
//       }

//       setTimeout(() => {
//         lastScannedCodeRef.current = null;
//       }, 2000);
//     }
//   };

//   const handleError = (err) => {
//     console.error("QR Scanner Error:", err);
//   };

//   return (
//     <section className="bg-gradient-to-r h-screen from-[#092068]/80 to-[#1ac4fa]/60 relative z-20 py-6 sm:py-8 lg:py-12 flex justify-center items-center">
//       <div>
//         <h2 className="text-white text-center mb-4">
//           Scan QR Code to Mark Attendance
//         </h2>
//         <QrReader
//           delay={300}
//           onError={handleError}
//           onResult={(result, error) => {
//             if (!!result) {
//               handleScan(result.text);
//             }
//           }}
//           style={{ width: "100%" }}
//         />
//         {message.text && (
//           <p
//             className={`mt-4 text-center ${
//               message.type === "success"
//                 ? "text-green-600 bg-green-200/60 backdrop-blur-sm"
//                 : "text-red-600 bg-red-200/60 backdrop-blur-sm"
//             }`}
//           >
//             {message.text}
//           </p>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ScanUser;

import React, { useState, useRef, useCallback } from "react";
import QrScanner from "react-qr-scanner";
import beepSound from "../../assets/beep.mp3";
import successSound from "../../assets/success.mp3";
import { customeAxios } from "../../api/service/axios";

const ScanUser = () => {
  const [scanResult, setScanResult] = useState(null);
  const lastScannedTimeRef = useRef(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isScanning, setIsScanning] = useState(true);

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
      } else {
        const beep = new Audio(beepSound);
        beep.play();
        setMessage({
          text: "User is not registered.",
          type: "error",
        });
      }

      // Reset scanning after delay
      setTimeout(() => {
        setIsScanning(true);
        setMessage({ text: "", type: "" });
      }, 2000);
    } catch (error) {
      console.error("Scanning error:", error);
      setMessage({
        text: "Error processing scan.",
        type: "error",
      });

      // Reset scanning after error
      setTimeout(() => {
        setIsScanning(true);
        setMessage({ text: "", type: "" });
      }, 2000);
    }
  }, []);

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
    setMessage({
      text: "Camera error. Please refresh the page.",
      type: "error",
    });
  };

  return (
    <section className="bg-gradient-to-r h-screen from-[#092068]/80 to-[#1ac4fa]/60 relative z-20 py-6 sm:py-8 lg:py-12 flex justify-center items-center">
      <div className="w-full max-w-md px-4">
        <h2 className="text-white text-center mb-4">
          Scan QR Code to Mark Attendance
        </h2>
        <div className="relative w-full h-[250px]">
          <QrScanner
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{
              width: "100%",
              maxWidth: "400px",
              margin: "0 auto",
            }}
            constraints={{
              video: {
                facingMode: "environment",
                width: { ideal: 1280 },
                height: { ideal: 720 },
              },
            }}
          />
          {!isScanning && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <p className="text-white">Processing...</p>
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
