// src/components/common/SectionDivider.jsx
import React from "react";
import curveDivider from "../../assets/Herobottom.svg";

const SectionDivider = ({color}) => {
  return (
    <div className={`overflow-hidden ${color}`}>
      <img
        src={curveDivider}
        alt="Section Divider"
        className="w-full -mb-1"
      />
    </div>
  );
};

export default SectionDivider;
