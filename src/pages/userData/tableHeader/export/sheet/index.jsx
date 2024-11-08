import { utils, write } from "xlsx";

// Function to export table to Google Sheets
const exportToGoogleSheets = (tableData) => {
  const worksheet = utils.json_to_sheet(
    tableData.map((item) => ({
      "Reg ID": item.RegistrationID,
      Name: item.ParticipantName,
      Designation: item.Designation,
      Collge: item.CollegeName,
      "Contact No": item.ContactNo,
      Email: item.EmailID,
      "Reg Date": item.RegistrationDate.split(" ")[0],
      "Food Type": item.FoodType,
    }))
  );
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Order List");
  const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "order_list.xlsx";
  link.click();
  URL.revokeObjectURL(url);
};

export default exportToGoogleSheets;
