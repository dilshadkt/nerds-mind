import React from "react";

const StatusSelect = ({ value, onChange }) => {
  return (
    <div className="relative w-48">
      <select
        value={value}
        onChange={onChange}
        className="block w-full p-3 text-xs md:text-sm text-gray-900 
                 border border-white/50 rounded-lg
                 bg-white/20 backdrop-blur-sm
                 appearance-none focus:outline-none
                 cursor-pointer"
      >
        <option value="all">All</option>
        <option value="registread">Registered</option>
        <option value="confirmed">Confirmed</option>
        <option value="Cancelled">Cancelled</option>
        <option value="attended">Attended</option>
      </select>

      {/* Custom dropdown arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default StatusSelect;
