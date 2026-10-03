import Navbar from "@/components/layouts/public/Navber";
import React from "react";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
