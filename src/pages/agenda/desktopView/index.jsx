import React from "react";
import RightPortion from "./rightPortion";
import LeftPortion from "./leftPortion";

const AgendaDeskTopView = () => {
  return (
    <section className="hidden md:flex justify-center w-full">
      <LeftPortion />
      <RightPortion />
    </section>
  );
};

export default AgendaDeskTopView;
