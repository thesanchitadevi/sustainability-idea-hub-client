import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { getCurrentUser } from "@/service/auth";
import React from "react";

const CommonLayout = async({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  
  return (
    <div>
      <Navbar user = {user} />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default CommonLayout;
