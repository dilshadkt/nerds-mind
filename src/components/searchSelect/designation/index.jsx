import React, { useState, useRef, useEffect } from "react";
import { useField } from "formik";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const SearchableDesignationSelect = ({
  name,
  options,
  placeholder = "Select a designation",
  label,
}) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOther, setIsOther] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const dropdownRef = useRef(null);

  // Filter designations based on search term
  const filteredOptions = options.filter((option) =>
    option.Position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle option selection
  const handleSelect = (value) => {
    if (value === "OTHER") {
      setIsOther(true);
      helpers.setValue("");
      setCustomValue("");
    } else {
      setIsOther(false);
      helpers.setValue(value);
    }
    setSearchTerm("");
    setIsOpen(false);
  };

  // Handle custom input change
  const handleCustomInputChange = (e) => {
    const value = e.target.value;
    setCustomValue(value);
    helpers.setValue(value);
  };

  return (
    <div className="sm:col-span-2">
      <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
        {label}*
      </label>

      <div ref={dropdownRef} className="relative">
        {isOther ? (
          <div className="relative">
            <input
              type="text"
              className={`w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ${
                meta.touched && meta.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter your designation"
              value={customValue}
              onChange={handleCustomInputChange}
            />
            <button
              type="button"
              onClick={() => {
                setIsOther(false);
                helpers.setValue("");
                setCustomValue("");
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        ) : (
          <>
            <div
              className={`relative w-full cursor-pointer rounded border bg-gray-50 ${
                meta.touched && meta.error
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            >
              <div className="flex items-center">
                <input
                  type="text"
                  className="w-full rounded px-3 text-gray-800 py-2 bg-gray-50 outline-none ring-indigo-300 transition duration-100 focus:ring"
                  placeholder={field.value || placeholder}
                  value={isOpen ? searchTerm : field.value || ""}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (!isOpen) setIsOpen(true);
                  }}
                  onClick={() => setIsOpen(true)}
                />
                <div className="absolute right-2 flex items-center gap-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>

            {isOpen && (
              <div className="absolute z-50 mt-1 w-full max-h-60 flex flex-col gap-3 overflow-auto rounded-md bg-white border border-gray-200 shadow-lg">
                {/* Other Option always at top */}
                <div
                  className={`cursor-pointer px-3 py-2 text-gray-800 hover:bg-gray-100 border-b border-gray-100`}
                  onClick={() => handleSelect("OTHER")}
                >
                  Other (Type your designation)
                </div>

                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer px-3 py-2 text-gray-800 hover:bg-gray-100 ${
                        field.value === option.Position
                          ? "bg-indigo-50 text-indigo-600"
                          : ""
                      }`}
                      onClick={() => handleSelect(option.Position)}
                    >
                      {option.Position}
                    </div>
                  ))
                ) : searchTerm ? (
                  <div className="px-3 py-2 text-gray-500">
                    No designations found
                  </div>
                ) : null}
              </div>
            )}
          </>
        )}
      </div>

      {/* Error Message */}
      {meta.touched && meta.error && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default SearchableDesignationSelect;
