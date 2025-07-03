import React from "react";
import curveDivider from "../../assets/Studiotop.svg";

const SectionDividerDown = () => {
  return (
    <div className="overflow-hidden">
      <img
        src={curveDivider}
        alt="Section Divider"
        className="w-full -mb-1"
      />
    </div>
  );
};

export default SectionDividerDown;
