import React, { useEffect, useRef, useState } from "react";

const TableRow = ({ index, row, handleStatus }) => {
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
  return (
    <tr className={`hover:bg-gray-200/30`} key={index}>
      <td className="py-5 px-3 font-normal text-base border-t whitespace-nowrap">
        {row.RegistrationID}
      </td>
      <td className="py-5 px-3 font-normal text-base border-t whitespace-nowrap">
        {row.ParticipantName}
      </td>
      <td className="py-5 px-3 font-normal  text-base border-t whitespace-nowrap">
        {row.Designation}
      </td>
      <td className="py-5 px-3 text-base font-normal border-t w-72 whitespace-normal">
        {row.CollegeName}
      </td>
      <td className="py-5 px-3 text-base font-normal border-t whitespace-nowrap">
        {row.ContactNo}
      </td>
      <td className="py-5 px-3 text-base font-normal border-t whitespace-nowrap">
        {row.EmailID}
      </td>
      <td className="py-5 px-3 text-base font-normal border-t whitespace-nowrap">
        {row.RegistrationDate}
      </td>
      <td className="py-5 px-3  text-base font-normal border-t whitespace-nowrap">
        {row.FoodType}
      </td>
      <td
        className={`py-5 px-3 relative   text-xs font-normal border-t whitespace-nowrap`}
      >
        <span
          onClick={() => setMenuOpen(true)}
          className={` relative z-0 cursor-pointer ${
            row.RegStatus === "Registread"
              ? `bg-blue-300 text-blue-600`
              : row.RegStatus === "Confirmed"
              ? `bg-green-300 text-green-600`
              : `bg-red-300 text-red-600`
          }   px-2 py-1 rounded-lg`}
        >
          {row.RegStatus}
        </span>

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
    </tr>
  );
};

export default TableRow;
