import React from "react";
import curveDivider from "../../assets/Studiotop.svg";

const SectionDividerDown = () => {
  return (
    <div className="overflow-hidden bg-gradient-to-r from-[#032f35] via-[#0c1634] to-[#320050] pt-0 -mt-1">
      <img
        src={curveDivider}
        alt="Section Divider"
        className="w-full -mb-1"
      />
    </div>
  );
};

export default SectionDividerDown;
