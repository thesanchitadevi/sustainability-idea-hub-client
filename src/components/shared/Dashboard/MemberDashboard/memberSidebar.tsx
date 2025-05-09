"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  {
    href: "/dashboard/member",
    label: "Member Dashboard",
    icon: LayoutDashboard,
  },
  { href: "/dashboard/member/create-idea", label: "Create Idea", icon: Users },
  { href: "/dashboard/member/my-ideas", label: "My Ideas", icon: FileText },
  { href: "/dashboard/member/profile", label: "Profile", icon: Users },
  { href: "/dashboard/member/logout", label: "Logout", icon: Users },
];

export function Sidebar2({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    setSidebarOpen(open);
  }, [open, setSidebarOpen]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded shadow"
      >
        {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={handleClose}
        />
      )}

      <aside
        className={cn(
          "fixed md:relative top-0 left-0 min-h-screen w-64 bg-gray-100 dark:bg-gray-900 z-40 transform transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <nav className="space-y-2 p-4 pt-16 md:pt-4 ">
          {links.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={handleClose}>
              <div
                className={cn(
                  "flex items-center gap-3 p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800",
                  pathname === href && "bg-gray-300 dark:bg-gray-800"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
