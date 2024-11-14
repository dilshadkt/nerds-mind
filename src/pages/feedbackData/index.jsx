import React, { useEffect, useState } from 'react'
import { getFeedbackData } from '../../api/service'
import FadeLoader from 'react-spinners/FadeLoader'
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";
import exportToGoogleSheets from './excel';

const FeedbackData = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [rowsLimit] = useState(10);
    const [rowsToShow, setRowsToShow] = useState([]);
    const [customPagination, setCustomPagination] = useState([]);
    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

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
    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = query === ""
            ? data
            : data.filter(row =>
                (row.participantName && row.participantName.toLowerCase().includes(query)) ||
                (row.college && row.college.toLowerCase().includes(query)) ||
                (row.mobileNumber && row.mobileNumber.toLowerCase().includes(query))
            );

        setFilteredData(filtered)
        setTotalPage(Math.ceil(filtered.length / rowsLimit));
        setCurrentPage(0);
        setRowsToShow(filtered.slice(0, rowsLimit))
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
            setLoading(true)
            try {
                const response = await getFeedbackData();
                const fetchedData = Array.isArray(response.data) ? response.data : [];
                setData(fetchedData)

                setFilteredData(fetchedData)
                setLoading(false)
            } catch (err) {
                console.log("error occured", err)

            }
            setLoading(false)
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Calculate total pages and set custom pagination
        const totalPages = Math.ceil(data.length / rowsLimit);
        setTotalPage(totalPages);
        setCustomPagination(Array(Math.ceil(data.length / rowsLimit)).fill(null));
        ;

        // Adjust rowsToShow based on currentPage
        // Ensure currentPage is within bounds (especially when data length changes)

        updateRowsToShow(currentPage); // Adjust currentPage if needed

    }, [data, rowsLimit, currentPage]);
    return (
        <div className='font-montserrat bg-gradient-to-r pt-20 min-h-screen px-3  from-[#092068]/65 to-[#1ac4fa]/60'>
            <div className="min-h-screen h-full  flex  justify-center pt-10 pb-14 ">
                <div className="w-full  px-2 ">
                    <div className='flex justify-between items-center  w-full'>
                        <div className=''>
                            <h1 className="text-2xl font-medium">
                                Feedback Data
                            </h1>
                        </div>
                        <div className=' w-1/3  flex gap-3 justify-end
              '>
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
                            <button className='p-2 border whitespace-nowrap' onClick={()=>{exportToGoogleSheets(filteredData)}} >Export to Excel</button>
                        </div>
                    </div>

                    {
                        loading ? (<div className="flex justify-center items-center mt-10">
                            <FadeLoader color="#000" loading={loading} size={50} />
                        </div>) : (
                            <div className="w-full overflow-x-scroll md:overflow-auto  2xl:max-w-none mt-2 ">
                                <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border">
                                    <thead className="rounded-lg text-base text-white font-semibold w-full">
                                        <tr className="bg-[#222E3A]/[6%] text-black">
                                        

                                            <th className="py-3 px-3 text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                                                Name
                                            </th>
                                            <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                                                Contact No
                                            </th>

                                            <th className="py-3 px-3  text-xs font-medium md:font-semibold sm:text-base  whitespace-nowrap">
                                                College
                                            </th>
                                            {data?.[0]?.questions?.map((item, index) => (
                                                <th key={index} className="py-3 px-3 text-xs font-medium md:font-semibold sm:text-base w-80 min-w-[20rem] max-w-xs break-words">
                                                    {item.question}
                                                </th>
                                            ))}

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowsToShow.map((row, index) => (
                                            <tr className={`hover:bg-gray-200/30 w-full`} key={index}>
                                                
                                                <td className="py-5 px-3 font-normal text-sm border-t whitespace-nowrap">
                                                    {row.participantName}
                                                </td>
                                                <td className="py-5 px-3 text-sm font-normal border-t whitespace-nowrap">
                                                    {row.mobileNumber}
                                                </td>

                                                <td className="py-5 px-3 text-sm font-normal border-t sm:text-base w-80 min-w-[14rem] max-w-xs break-words">
                                                    {row.college}
                                                </td>

                                                {row?.questions?.map((item, idx) => (
                                                    <td key={idx} className="py-5 px-3 text-sm font-normal border-t w-72 whitespace-normal">
                                                        {item.answer}
                                                    </td>
                                                ))}

                                            </tr>))}
                                    </tbody>
                                </table>
                            </div>)}
                    <div className="w-full flex justify-center sm:justify-end flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">

                        <div className="flex">
                            <ul className="flex justify-center items-center gap-x-2 z-30">
                                <li
                                    className={`prev-btn flex items-center justify-center w-9 h-9 border ${currentPage === 0
                                        ? 'bg-gray-300 pointer-events-none'
                                        : 'cursor-pointer'
                                        }`}
                                    onClick={previousPage}
                                >
                                    <GrFormPrevious className='cursor-pointer' />
                                </li>
                                {customPagination.map((_, index) => (
                                    <li
                                        className={`flex items-center justify-center w-9 h-9 cursor-pointer border ${currentPage === index ? 'text-blue-600 border-blue-500' : ''
                                            }`}
                                        onClick={() => changePage(index)}
                                        key={index}
                                    >
                                        {index + 1}
                                    </li>
                                ))}
                                <li
                                    className={`flex items-center justify-center w-9 h-9 border ${currentPage === totalPage - 1
                                        ? 'bg-gray-300 pointer-events-none'
                                        : 'cursor-pointer'
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
    )

}

export default FeedbackData