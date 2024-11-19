import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { customeAxios } from "./axios";
import toast from "react-hot-toast";
export const generateAndSendPDF = async (
  values,
  entryPassRef,
  setData,
  setFilteredData,
  data,
  id,
  status
) => {
  const entryPassElement = entryPassRef.current;
  if (!entryPassElement) {
    console.error("Entry pass component not found");
    return;
  }

  // Temporarily make the element visible but positioned off-screen
  const originalStyle = entryPassElement.style.cssText;
  entryPassElement.style.cssText = `
      position: fixed;
      top: 0;
      left: -9999px;
      width: 1024px;
      height: auto;
      visibility: visible;
      display: block;
      background: white;
      margin: 0;
      padding: 0;
    `;

  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const canvas = await html2canvas(entryPassElement, {
      useCORS: true,
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: 1024,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById("entry-pass");
        if (clonedElement) {
          clonedElement.style.display = "block";
          clonedElement.style.visibility = "visible";
          // Remove any margins or padding from cloned element
          clonedElement.style.margin = "0";
          clonedElement.style.padding = "0";
        }
      },
    });

    // A4 dimensions in mm
    const a4Width = 210;
    const a4Height = 297;

    // Create PDF with zero margins
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    // Calculate scaling to fill the entire page
    const imgRatio = canvas.width / canvas.height;
    const pageRatio = a4Width / a4Height;

    let finalWidth = a4Width;
    let finalHeight = a4Height;

    // Adjust dimensions to maintain aspect ratio while filling the page
    if (imgRatio > pageRatio) {
      // Image is wider than page ratio
      finalHeight = a4Width / imgRatio;
    } else {
      // Image is taller than page ratio
      finalWidth = a4Height * imgRatio;
    }

    // Center the image if it doesn't perfectly fill both dimensions
    const xOffset = (a4Width - finalWidth) / 2;
    const yOffset = (a4Height - finalHeight) / 2;

    pdf.addImage(
      canvas.toDataURL("image/jpeg", 1.0),
      "JPEG",
      xOffset,
      yOffset,
      finalWidth,
      finalHeight,
      undefined,
      "FAST"
    );

    pdf.save("EntryPass.pdf");
    // Convert PDF to Blob and send as email attachment
    const pdfBlob = pdf.output("blob");
    await sendEmailWithAttachment(
      pdfBlob,
      values,
      setData,
      setFilteredData,
      data,
      id,
      status
    );
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  } finally {
    entryPassElement.style.cssText = originalStyle;
  }
};

const sendEmailWithAttachment = async (
  pdfBlob,
  userData,
  setData,
  setFilteredData,
  data,
  id,
  status
) => {
  try {
    // Create FormData and append only the PDF file
    const formData = new FormData();
    formData.append("pdfFile", pdfBlob, "EntryPass.pdf");

    // Send request with custom headers
    const emailResponse = await customeAxios.post("/send-email", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ParticipantName: userData.ParticipantName,
        EmailID: userData.EmailID,
      },
    });
    const updatedData = data.map((data) =>
      Number(data.RegistrationID) === Number(id)
        ? { ...data, RegStatus: status }
        : data
    );
    toast.success("Status changed");
    setFilteredData(updatedData);
    setData(updatedData);
    // console.log("Email sent successfully:", emailResponse);
    return emailResponse;
  } catch (error) {
    const updatedData = data.map((data) =>
      Number(data.RegistrationID) === Number(id)
        ? { ...data, RegStatus: "Cancelled" }
        : data
    );
    setFilteredData(updatedData);
    setData(updatedData);
    console.error("Error sending email:", error);
    toast.error("Email failed. Please verify the email address");
    // throw error;
  }
};

export const getRegisterData = async () => {
  try {
    const response = await customeAxios.get(`/getRegistrartionData`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching registration data:", error);
    throw error;
  }
};

export const getFeedbackData = async () => {
  try {
    const response = await customeAxios.get(`/getFeedBack`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching feedback data:", error);
    throw error;
  }
};

export const checkCodeInDatabase = async (code) => {
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

const generatePDF = async (userData, entryPassRef) => {
  const entryPassElement = entryPassRef.current;
  if (!entryPassElement) {
    console.error("Entry pass component not found");
    return;
  }

  // Temporarily make the element visible but positioned off-screen
  const originalStyle = entryPassElement.style.cssText;
  entryPassElement.style.cssText = `
      position: fixed;
      top: 0;
      left: -9999px;
      width: 1024px;
      height: auto;
      visibility: visible;
      display: block;
      background: white;
      margin: 0;
      padding: 0;
    `;

  try {
    await new Promise((resolve) => setTimeout(resolve, 100));
    const canvas = await html2canvas(entryPassElement, {
      useCORS: true,
      scale: 2,
      backgroundColor: "#ffffff",
      logging: false,
      windowWidth: 1024,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById("entry-pass");
        if (clonedElement) {
          clonedElement.style.display = "block";
          clonedElement.style.visibility = "visible";
          clonedElement.style.margin = "0";
          clonedElement.style.padding = "0";
        }
      },
    });

    // A4 dimensions in mm
    const a4Width = 210;
    const a4Height = 297;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const imgRatio = canvas.width / canvas.height;
    const pageRatio = a4Width / a4Height;

    let finalWidth = a4Width;
    let finalHeight = a4Height;

    if (imgRatio > pageRatio) {
      finalHeight = a4Width / imgRatio;
    } else {
      finalWidth = a4Height * imgRatio;
    }

    const xOffset = (a4Width - finalWidth) / 2;
    const yOffset = (a4Height - finalHeight) / 2;

    pdf.addImage(
      canvas.toDataURL("image/jpeg", 1.0),
      "JPEG",
      xOffset,
      yOffset,
      finalWidth,
      finalHeight,
      undefined,
      "FAST"
    );

    // Save each PDF with a unique name (e.g., using user's name or ID)
    pdf.save(`EntryPass_${userData.ParticipantName || userData.EmailID}.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  } finally {
    entryPassElement.style.cssText = originalStyle;
  }
};

export default generatePDF;

// export const generateCertificatePDF = async (certificateRef) => {
//   const certificateElement = certificateRef.current;
//   if (!certificateElement) {
//     console.error("Certificate component not found");
//     return;
//   }

//   // Store original styles
//   const originalStyle = certificateElement.style.cssText;

//   // Set temporary styles for PDF generation with your specific dimensions
//   certificateElement.style.cssText = `
//     position: fixed;
//     top: 0;
//     left: -9999px;
//     width: 1056px;
//     height: 816px;
//     visibility: visible;
//     display: block;
//     background: white;
//     margin: 0;
//     padding: 0;
//   `;

//   try {
//     // Allow time for styles to apply
//     await new Promise((resolve) => setTimeout(resolve, 100));

//     // Create canvas with higher scale for better quality
//     const canvas = await html2canvas(certificateElement, {
//       useCORS: true,
//       // scale: 2, // Higher scale for better quality
//       backgroundColor: "#ffffff",
//       logging: false,
//       width: 1056,
//       height: 816,
//       onclone: (clonedDoc) => {
//         const clonedElement = clonedDoc.querySelector("section");
//         if (clonedElement) {
//           clonedElement.style.display = "block";
//           clonedElement.style.visibility = "visible";
//           clonedElement.style.margin = "0";
//           clonedElement.style.padding = "0";
//           clonedElement.style.width = "1056px";
//           clonedElement.style.height = "816px";
//         }
//       },
//     });

//     // Create PDF with custom dimensions
//     // Using a custom size that matches your certificate's aspect ratio
//     const pdf = new jsPDF({
//       orientation: "landscape",
//       unit: "px",
//       format: [816, 1056], // Height, Width in pixels
//       compress: true,
//     });

//     // Add image to PDF - using the full page size
//     pdf.addImage(
//       canvas.toDataURL("image/jpeg", 1.0),
//       "JPEG",
//       0,
//       0,
//       816, // Height in PDF
//       1056, // Width in PDF
//       undefined,
//       "FAST"
//     );

//     // Save the PDF with user's name from the certificate
//     // const userName = values?.name || userData?.name || "User";
//     pdf.save(`Certificate_.pdf`);

//     // If you need to send as email attachment
//     const pdfBlob = pdf.output("blob");
//     // if (typeof sendEmailWithAttachment === "function") {
//     //   await sendEmailWithAttachment(
//     //     pdfBlob,
//     //     values,
//     //     setData,
//     //     setFilteredData,
//     //     data,
//     //     id,
//     //     status
//     //   );
//     // }
//   } catch (error) {
//     console.error("Error generating certificate PDF:", error);
//     throw error;
//   } finally {
//     // Restore original styles
//     certificateElement.style.cssText = originalStyle;
//   }
// };

export const generateCertificatePDF = async (
  certificateRef,
  userData,
  setData,
  setFilteredData,
  data,
  isSendToEmail
) => {
  const certificateElement = certificateRef.current;
  if (!certificateElement) {
    console.error("Certificate component not found");
    return;
  }

  // Store original styles
  const originalStyle = certificateElement.style.cssText;

  try {
    // First set the element to be visible but off-screen
    certificateElement.style.cssText = `
      position: fixed;
      top: 0;
      left: -9999px;
      width: 1056px;
      height: 816px;
      visibility: visible;
      display: block;
      background: white;
      margin: 0;
      padding: 0;
      transform-origin: top left;
      transform: scale(1);
    `;

    // Wait for the element to be properly rendered
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Create canvas
    const canvas = await html2canvas(certificateElement, {
      useCORS: true,
      scale: 2, // Increased scale for better quality
      backgroundColor: "#ffffff",
      logging: false,
      width: 1056,
      height: 816,
      windowWidth: 1056,
      windowHeight: 816,
      imageTimeout: 0,
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.querySelector("section");
        if (clonedElement) {
          // Apply exact styles to cloned element
          clonedElement.style.cssText = `
            display: block !important;
            visibility: visible !important;
            width: 1056px !important;
            height: 816px !important;
            margin: 0 !important;
            padding: 0 !important;
            transform: none !important;
            position: relative !important;
            max-width: none !important;
            max-height: none !important;
            min-width: none !important;
            min-height: none !important;
          `;

          // Ensure the image inside is also properly styled
          const img = clonedElement.querySelector("img");
          if (img) {
            img.style.cssText = `
              width: 100% !important;
              height: 100% !important;
              object-fit: contain !important;
              display: block !important;
            `;
          }
        }
      },
    });

    // Calculate dimensions for PDF
    // We'll use points (pt) as the unit for more precise control
    const pdfWidth = 1056;
    const pdfHeight = 816;

    // Create PDF with exact dimensions
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt", // Using points for more precise dimensions
      format: [pdfHeight, pdfWidth],
      compress: true,
      hotfixes: ["px_scaling"],
    });

    // Add image to PDF with exact dimensions
    pdf.addImage(
      canvas.toDataURL("image/jpeg", 1.0),
      "JPEG",
      0,
      0,
      pdfWidth,
      pdfHeight,
      undefined,
      "FAST"
    );

    // Save the PDF
    pdf.save(`${userData.ParticipantName}.pdf`);
    const pdfBlob = pdf.output("blob");
    if (isSendToEmail) {
      await sendCertificaet(pdfBlob, userData, setData, setFilteredData, data);
    }
  } catch (error) {
    console.error("Error generating certificate PDF:", error);
    throw error;
  } finally {
    // Restore original styles
    certificateElement.style.cssText = originalStyle;
  }
};

const sendCertificaet = async (
  pdfBlob,
  userData,
  setData,
  setFilteredData,
  data
) => {
  try {
    // Create FormData and append only the PDF file
    const formData = new FormData();
    formData.append("pdfFile", pdfBlob, "Certificate.pdf");

    // Send request with custom headers
    const emailResponse = await customeAxios.post("/send-email", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ParticipantName: userData.ParticipantName,
        EmailID: userData.EmailID,
      },
    });
    const userId = userData.UniqueID;
    const filteredUserData = data.map((user) =>
      user.UniqueID === userId ? { ...user, IsCertificateSend: true } : user
    );
    setData(filteredUserData);
    setFilteredData(filteredUserData);
    toast.success("Status changed");
  } catch (error) {
    console.error("Error sending email:", error);
    toast.error("Email failed. Please verify the email address");
    // throw error;
  }
};
