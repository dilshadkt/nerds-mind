import { utils, write } from "xlsx";

// Function to export table to Google Sheets
const exportToGoogleSheets = (tableData) => {

    const headers = [
        "Name",
        "College",
        "Contact No",
        "How relevant was the content of the FDP to your current teaching needs",
        "How would you rate your overall experience with the FDP",
        "Would you recommend this program to other faculty members",
        "To transform your students into future job ready, please suggest a tentative date for a campus presentation about AI by team Scanntek IT Solutions?",
        "Do you have any suggestions/Comments/Feedback?"
      ];

  const worksheet = utils.json_to_sheet(
    tableData.map((item) => ({
      
      Name: item.participantName,
      College: item.college,
      "Contact No": item.mobileNumber,
      "How relevant was the content of the FDP to your current teaching needs": item.questions?.[0]?.answer || "N/A",
      "How would you rate your overall experience with the FDP": item.questions?.[1]?.answer || "N/A",
      "Would you recommend this program to other faculty members": item.questions?.[2]?.answer || "N/A",
      "To transform your students into future job ready, please suggest a tentative date for a campus presentation about AI by team Scanntek IT Solutions?": item.questions?.[3]?.answer || "N/A",
      "Do you have any suggestions/Comments/Feedback?": item.questions?.[4]?.answer || "N/A",
    }))
  );

  worksheet['!cols'] = headers.map(header => ({
    wch: header.length > 20 ? header.length : 20 // Set minimum width or match header length
  }));

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Feedback List");
  const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "feedback_list.xlsx";
  link.click();
  URL.revokeObjectURL(url);
};

export default exportToGoogleSheets;
