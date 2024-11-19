import React, { forwardRef } from "react";
import Cirtficate from "../../assets/images/cirtficate.jpg";
const Cirtificate = forwardRef(({ userData }, ref) => {
  return (
    <section ref={ref} className="w-[1056px] h-[816px] bg-red-200 relative ">
      <img src={Cirtficate} alt="cirtficate" className="w-full h-full" />
      <div className="absolute top-[320px] left-[100px] ">
        <h1 className="font-taprom text-gray-800 text-6xl">
          {userData.ParticipantName}
        </h1>
        <p className="w-[90%] leading-7 mt-10 text-sm font-medium text-gray-700">
          This is to certify that Mr./Ms. {userData.ParticipantName},{"  "}
          {userData.Designation} at {userData.CollegeName}, has successfully
          attended a training session on Artificial Intelligence, covering
          various related topics. The training was held on November 9, 2024, and
          was organized by Nerdz Minds, sponsored by Scanntek IT Solutions LLP
          at KINFRA, Kakkanchery.
        </p>
      </div>
    </section>
  );
});

export default Cirtificate;
