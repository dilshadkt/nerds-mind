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

    // pdf.save("EntryPass.pdf");
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
