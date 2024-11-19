import React, { useState, useEffect, useRef } from "react";
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import FadeLoader from "react-spinners/FadeLoader";
import {
  generateAndSendPDF,
  generateCertificatePDF,
  getRegisterData,
} from "../../api/service";
import TableRow from "./tableRow";
import { customeAxios } from "../../api/service/axios";
import toast from "react-hot-toast";
import EntryPass from "../../components/entrypass";
import StatusSelect from "./selectBox";
import TableHeader from "./tableHeader";
import Cirtificate from "../../components/cirtficate";

const UserData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [rowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [customPagination, setCustomPagination] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [certificateSendLoading, setCertificateLoading] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const entryPassRef = useRef();
  const certficateRef = useRef();
  const [registerId, setRegiterId] = useState(null);
  const [values, setValues] = useState({});
  const [certificateValue, setCertficateValue] = useState({});
  const [status, setStatus] = useState("all");
  const updateRowsToShow = (page) => {
    const startIndex = page * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(filteredData.slice(startIndex, endIndex));
  };

  const nextPage = () => {
    if (currentPage < totalPage - 1) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updateRowsToShow(newPage);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updateRowsToShow(newPage);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
    updateRowsToShow(page);
  };

  const handleStatus = async (id, status, value) => {
    // set values and id for the entry pass
    setValues(value);
    setRegiterId(value.UniqueID);
    // updated the value for the loading state
    const updatedData = data.map((data) =>
      Number(data.RegistrationID) === Number(id)
        ? { ...data, RegStatus: "Loading" }
        : data
    );
    setFilteredData(updatedData);
    setData(updatedData);
    // api for change the status
    try {
      const response = await customeAxios.post(
        "/UpdateRegistartionStatus",
        {},
        {
          headers: {
            RegID: id,
            hasConfirmed: status === "Confirmed" ? `true` : `false`,
            hasCancelled: status === "Cancelled" ? `true` : `false`,
          },
        }
      );
      // if status is cancelled , in that case we dont need to generate and send so make ui changes from here
      if (status === "Cancelled") {
        const updatedData = data.map((data) =>
          Number(data.RegistrationID) === Number(id)
            ? { ...data, RegStatus: status }
            : data
        );
        toast.success("Status changed");
        setFilteredData(updatedData);
        setData(updatedData);
      }
      // if status is confirmed we pass the function to modify the ui changes
      if (status === "Confirmed") {
        await generateAndSendPDF(
          value,
          entryPassRef,
          setData,
          setFilteredData,
          data,
          id,
          status
        );
      }
    } catch (error) {
      toast.success(error || "Failed to changes");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    let filtered =
      query === ""
        ? data
        : data.filter(
            (row) =>
              (row.ParticipantName &&
                row.ParticipantName.toLowerCase().includes(query)) ||
              (row.CollegeName &&
                row.CollegeName.toLowerCase().includes(query)) ||
              (row.ContactNo && row.ContactNo.includes(query))
          );
    if (status !== "all") {
      filtered = filtered.filter(
        (item) => item.RegStatus.toLowerCase() === status.toLowerCase()
      );
    }
    setFilteredData(filtered);
    setTotalPage(Math.ceil(filtered.length / rowsLimit));
    setCurrentPage(0);
    setRowsToShow(filtered.slice(0, rowsLimit));
  };

  useEffect(() => {
    updateRowsToShow(currentPage);
  }, [filteredData, currentPage]);

  useEffect(() => {
    const totalPages = Math.ceil(data.length / rowsLimit);
    setTotalPage(totalPages);
    setCustomPagination(Array(totalPages).fill(null));
    setFilteredData(data);
    setRowsToShow(data.slice(0, rowsLimit));
  }, [data, rowsLimit]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getRegisterData();
        const fetchedData = Array.isArray(response.data) ? response.data : [];
        setData(fetchedData);

        setFilteredData(fetchedData);
        setLoading(false);
      } catch (err) {
        console.log("error occured", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate total pages and set custom pagination
    const totalPages = Math.ceil(data.length / rowsLimit);
    setTotalPage(totalPages);
    setCustomPagination(Array(Math.ceil(data.length / rowsLimit)).fill(null));
    // Adjust rowsToShow based on currentPage
    // Ensure currentPage is within bounds (especially when data length changes)

    updateRowsToShow(currentPage); // Adjust currentPage if needed
  }, [data, rowsLimit, currentPage]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    if (e.target.value === "all") {
      setFilteredData(data);
    } else if (e.target.value === "attended") {
      const filtered = data.filter((data) => data.HasAttended === true);
      setFilteredData(filtered);
    } else {
      const filtered = data.filter(
        (data) => data.RegStatus.toLowerCase() === e.target.value.toLowerCase()
      );
      setFilteredData(filtered);
    }
  };

  const handleGeneratePDF = async (userData, isSendToEmail = true) => {
    setCertficateValue(userData);
    if (isSendToEmail) {
      setCertificateLoading(userData.RegistrationID);
    }
    try {
      await generateCertificatePDF(
        certficateRef,
        userData,
        setData,
        setFilteredData,
        data,
        isSendToEmail
      );
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setCertificateLoading(null);
    }
  };

  return (
    <>
      <div className="font-montserrat bg-gradient-to-r pt-20 min-h-screen  from-[#092068]/65 to-[#1ac4fa]/60">
        <div className=" h-full flex  justify-center pt-10 pb-14 ">
          <div className="w-full  px-2">
            <TableHeader
              handleSearch={handleSearch}
              handleStatusChange={handleStatusChange}
              searchQuery={searchQuery}
              status={status}
              filteredData={data}
              entryPassRef={entryPassRef}
            />

            {loading ? (
              <div className="flex justify-center items-center mt-10">
                <FadeLoader color="#000" loading={loading} size={50} />
              </div>
            ) : (
              <div className="w-full overflow-x-scroll md:overflow-auto  2xl:max-w-none mt-2 ">
                <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
                  <thead className="rounded-lg text-base text-white font-semibold w-full">
                    <tr className="bg-[#222E3A]/[6%] text-black">
                      <th className="py-3 px-3 text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        Reg ID
                      </th>
                      <th className="py-3 px-3 text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        Name
                      </th>
                      <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        Designation
                      </th>
                      <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        College
                      </th>
                      <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        Contact No
                      </th>
                      <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        Email
                      </th>
                      <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        Reg Date
                      </th>
                      <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        Food Type
                      </th>
                      <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        Status
                      </th>
                      <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        Action
                      </th>
                      <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                        Certificate
                      </th>
                      <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {rowsToShow.map((row, index) => (
                      <TableRow
                        key={index}
                        index={index}
                        row={row}
                        data={data}
                        setData={setData}
                        setFilteredData={setFilteredData}
                        handleStatus={handleStatus}
                        handleGeneratePDF={handleGeneratePDF}
                        certificateSendLoading={certificateSendLoading}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="w-full flex justify-center sm:justify-end flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
              <div className="flex">
                <ul className="flex justify-center items-center gap-x-2 z-30">
                  <li
                    className={`prev-btn flex items-center justify-center w-9 h-9 border ${
                      currentPage === 0
                        ? "bg-gray-300 pointer-events-none"
                        : "cursor-pointer"
                    }`}
                    onClick={previousPage}
                  >
                    <GrFormPrevious className="cursor-pointer" />
                  </li>
                  {customPagination.map((_, index) => (
                    <li
                      className={`flex items-center justify-center w-9 h-9 cursor-pointer border ${
                        currentPage === index
                          ? "text-blue-600 border-blue-500"
                          : ""
                      }`}
                      onClick={() => changePage(index)}
                      key={index}
                    >
                      {index + 1}
                    </li>
                  ))}
                  <li
                    className={`flex items-center justify-center w-9 h-9 border ${
                      currentPage === totalPage - 1
                        ? "bg-gray-300 pointer-events-none"
                        : "cursor-pointer"
                    }`}
                    onClick={nextPage}
                  >
                    <MdNavigateNext />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        id="entry-pass"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
          pointerEvents: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <EntryPass
          registerId={registerId}
          ref={entryPassRef}
          userData={values}
          style={{
            margin: 0,
            padding: 0,
          }}
        />
      </div>
      {/* Cirtficate  */}
      <div
        id="cirtficate"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          opacity: 0,
          pointerEvents: "none",
          margin: 0,
          padding: 0,
        }}
      >
        <Cirtificate ref={certficateRef} userData={certificateValue} />
      </div>
    </>
  );
};

export default UserData;
