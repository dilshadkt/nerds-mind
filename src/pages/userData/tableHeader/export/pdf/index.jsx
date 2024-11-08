import jsPDF from "jspdf";
import "jspdf-autotable";

// Function to export table as PDF
const exportAsPDF = (tableData) => {
  const doc = new jsPDF();
  doc.autoTable({
    head: [
      [
        "Reg ID",
        "Name",
        "Designation",
        "Collge",
        "Contact No",
        "Email",
        "Reg Date",
        "Food Type",
      ],
    ],
    body: tableData.map((item) => [
      item.RegistrationID,
      `${item.ParticipantName}`,
      item.Designation,
      item.CollegeName,
      item.ContactNo,
      item.EmailID,
      item.RegistrationDate.split(" ")[0],
      item.FoodType,
    ]),
  });
  doc.save("order_list.pdf");
};

export default exportAsPDF;
