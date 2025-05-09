

'use client'


import { Topbar } from "@/components/shared/Dashboard/AdminDashboard/TopBar";
import { Sidebar2 } from "@/components/shared/Dashboard/MemberDashboard/memberSidebar";
import { useState } from "react";
import { Sidebar } from '@/components/shared/Dashboard/AdminDashboard/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = {
    email: "kamrul@gmail.com",
    role: "ADMIN"
  };

  const topBarText = user?.role === 'ADMIN' ? 'Admin Panel' : 'Member Panel';
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white dark:bg-black text-black dark:text-white">
      {user?.role === 'ADMIN' ? (
        <Sidebar setSidebarOpen={setSidebarOpen} />
      ) : (
        <Sidebar2 setSidebarOpen={setSidebarOpen} />
      )}

      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          sidebarOpen ? 'md:ml-64' : 'ml-0'
        }`}
      >
        <Topbar text={topBarText} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
