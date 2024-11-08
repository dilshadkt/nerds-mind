import { useEffect, useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import exportAsPDF from "../export/pdf";
import exportToGoogleSheets from "../export/sheet";

const ExportMenu = ({ filteredOrder, DownloadAllAdmitCard }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  //  handle function for close the menu while click outside
  useEffect(() => {
    const handleClose = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClose);
    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [menuRef]);
  return (
    <div className="  relative">
      <div
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
        className="cursor-pointer"
      >
        <MoreVertIcon className="" fontSize="medium" />
      </div>
      <div
        ref={menuRef}
        className={` ${
          menuOpen ? `scale-100` : `scale-0 overflow-hidden`
        } w-[200px]  rounded-lg text-xs md:text-sm h-fit right-0 top-8
  border border-gray-100 transition-all duration-300
  bg-white shadow-md absolute z-40`}
      >
        <ul className="text-gray-700 ">
          <li
            onClick={() => {
              exportAsPDF(filteredOrder);
              setMenuOpen(false);
            }}
            className="p-3 cursor-pointer hover:bg-gray-100 transition-all duration-300 "
          >
            Export as PDF
          </li>
          <li
            onClick={() => {
              exportToGoogleSheets(filteredOrder);
              setMenuOpen(false);
            }}
            className="p-3  cursor-pointer hover:bg-gray-100 transition-all duration-300 "
          >
            Export to Excel
          </li>
          <li
            onClick={() => DownloadAllAdmitCard()}
            className="p-3 whitespace-nowrap  cursor-pointer hover:bg-gray-100 transition-all duration-300 "
          >
            Download All Admit Card
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExportMenu;
