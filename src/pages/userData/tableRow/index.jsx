import React, { useEffect, useRef, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import { checkCodeInDatabase } from "../../../api/service";
import toast from "react-hot-toast";
const TableRow = ({
  index,
  row,
  handleStatus,
  data,
  setData,
  setFilteredData,
}) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const status = ["Confirmed", "Cancelled"];
  const menuRef = useRef();
  useEffect(() => {
    const handleClose = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [menuRef]);

  const handleChanges = (status) => {
    setMenuOpen(false);
    handleStatus(row.RegistrationID, status, row);
  };
  const markPresent = async (regId) => {
    const response = await checkCodeInDatabase(regId);
    if (true) {
      const filtered = data.map((data) =>
        data.UniqueID.toString() === regId.toString()
          ? { ...data, RegStatus: "Attended" }
          : data
      );
      setFilteredData(filtered);
      setData(filtered);
      toast.success("Attendence marked successfully");
    }
  };
  return (
    <tr className={`hover:bg-gray-200/30 `} key={index}>
      <td className="py-5 px-3 font-normal text-sm border-t whitespace-nowrap">
        {row.RegistrationID}
      </td>
      <td className="py-5 px-3 font-normal text-sm border-t whitespace-nowrap">
        {row.ParticipantName}
      </td>
      <td className="py-5 px-3 font-normal  text-sm border-t whitespace-nowrap">
        {row.Designation}
      </td>
      <td className="py-5 px-3 text-sm font-normal border-t w-72 whitespace-normal">
        {row.CollegeName}
      </td>
      <td className="py-5 px-3 text-sm font-normal border-t whitespace-nowrap">
        {row.ContactNo}
      </td>
      <td className="py-5 px-3 text-sm font-normal border-t whitespace-nowrap">
        {row.EmailID}
      </td>
      <td className="py-5 px-3 text-sm font-normal border-t whitespace-nowrap">
        {row.RegistrationDate}
      </td>
      <td className="py-5 px-3  text-sm font-normal border-t whitespace-nowrap">
        {row.FoodType}
      </td>
      <td
        className={`py-5 px-3 relative   text-xs font-normal border-t whitespace-nowrap`}
      >
        <button
          disabled={row.RegStatus === "Loading" || row.RegStatus === "Attended"}
          onClick={() => setMenuOpen(true)}
          className={` relative z-0 cursor-pointer ${
            row.RegStatus === "Registread"
              ? `bg-blue-300 text-blue-600`
              : row.RegStatus === "Confirmed"
              ? `bg-green-300 text-green-600`
              : row.RegStatus === "Attended"
              ? `bg-white/60 text-gray-500 font-medium cursor-text`
              : `bg-red-300 text-red-600`
          }   px-2 py-1 rounded-lg`}
        >
          {row.RegStatus === "Loading" ? `sending...` : row.RegStatus}
        </button>

        <div
          ref={menuRef}
          className={`${isMenuOpen ? `scale-100 ` : `scale-0`} transition-all
                duration-300 absolute z-50  rounded-md bg-white mt-2 w-full right-6`}
        >
          <ul className="flex flex-col">
            {status.map((item, index) => (
              <li
                onClick={() => handleChanges(item)}
                className="p-3  cursor-pointer w-full hover:bg-gray-200"
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </td>
      <td
        className={`py-5 px-3 relative   text-xs font-normal border-t whitespace-nowrap`}
      >
        <button
          disabled={row.RegStatus === "Attended"}
          onClick={() => markPresent(row.UniqueID)}
          className={`text-xs ${
            row.RegStatus !== "Attended"
              ? `hover:text-blue-500 hover:underline `
              : "text-gray-400"
          } `}
        >
          Mark Present
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
