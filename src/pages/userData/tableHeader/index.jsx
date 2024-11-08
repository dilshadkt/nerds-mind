import React from "react";
import ReactDOM from "react-dom/client";
import generatePDF from "../../../api/service";
import EntryPass from "../../../components/entrypass";
import StatusSelect from "../selectBox";
import ExportMenu from "./exportMenu";
const TableHeader = ({
  status,
  handleStatusChange,
  searchQuery,
  handleSearch,
  filteredData,
  entryPassRef,
}) => {
  const DownloadAllAdmitCard = async () => {
    const confirmedUser = filteredData.filter(
      (user) => user.RegStatus === "Confirmed"
    );
    const hiddenContainer = document.createElement("div");

    hiddenContainer.style.position = "absolute";
    hiddenContainer.style.left = "-9999px";
    hiddenContainer.style.top = "-9999px";
    document.body.appendChild(hiddenContainer);

    for (const user of confirmedUser) {
      const root = ReactDOM.createRoot(hiddenContainer);
      root.render(
        <EntryPass
          userData={user}
          registerId={user.UniqueID}
          ref={entryPassRef}
        />
      );

      await new Promise((resolve) => setTimeout(resolve, 50));
      await generatePDF(user, entryPassRef);
      root.unmount();
    }
  };
  return (
    <div className="grid md:grid-cols-2 mb-4 items-center justify-start">
      <div className="hidden md:block">
        <h1 className="text-xl text-gray-800 font-medium">Registered Users</h1>
      </div>
      <div className="w-full flex items-center gap-x-3">
        <StatusSelect value={status} onChange={handleStatusChange} />
        <form className="w-full ">
          <label
            htmlFor="default-search"
            className="mb-2 text-xs md:text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 ps-12 text-xs md:text-sm focus:outline-none
         text-gray-900 placeholder-gray-800 border border-white/50 rounded-lg
          bg-white/20 backdrop-blur-sm dark:border-white/50  "
              value={searchQuery}
              placeholder="Search by name or college or number"
              onChange={handleSearch}
              required
            />
          </div>
        </form>

        <ExportMenu
          filteredOrder={filteredData}
          DownloadAllAdmitCard={DownloadAllAdmitCard}
        />
      </div>
    </div>
  );
};

export default TableHeader;
