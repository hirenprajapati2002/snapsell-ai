import React from "react";
import StudioSidebar from "../components/StudioSidebar";
import StudioNavbar from "../components/StudioNavbar";

const StudioLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#f8f9fc]">
      {/* Sidebar */}
      <div className="w-60">
        <StudioSidebar />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <StudioNavbar />

        {/* Use flex-col to make space for hero + footer */}
        <main className="flex-1 flex flex-col justify-between gap-6 px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudioLayout;
