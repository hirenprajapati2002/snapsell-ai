import React from "react";
import StudioSidebar from "../components/StudioSidebar";
import StudioNavbar from "../components/StudioNavbar";

const StudioLayout = ({ children }) => {
  return (
    <div className=" bg-gray-50 min-h-screen">
      <StudioNavbar />
      <div className="flex pt-16">
        <StudioSidebar />
        <main className="flex-1 ml-60 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudioLayout;
