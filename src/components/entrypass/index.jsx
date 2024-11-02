import React, { forwardRef } from "react";
import TopPart from "./topPart";
import BottomPart from "./bottomPart";

// Convert mm to pixels (assuming 96 DPI)
const mmToPx = (mm) => (mm * 96) / 25.4;

// A4 dimensions in mm
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Convert to pixels for rendering
const A4_WIDTH_PX = mmToPx(A4_WIDTH_MM);
const A4_HEIGHT_PX = mmToPx(A4_HEIGHT_MM);

const EntryPass = forwardRef(({ userData, registerId }, ref) => {
  return (
    <div
      ref={ref}
      className="flex flex-col bg-white border border-gray-100"
      style={{
        width: A4_WIDTH_PX,
        height: A4_HEIGHT_PX,
      }}
    >
      <div className="h-1/2 w-full box-border">
        <TopPart userData={userData} registerId={registerId} />
      </div>

      <div className="h-1/2 w-full box-border">
        <BottomPart />
      </div>
    </div>
  );
});

// Add display name for debugging purposes

export default EntryPass;
