"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Lightbulb,
  FileText,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { logOut } from "@/service/auth";

const navLinks = [
  {
    href: "/dashboard/member",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/member/create-idea",
    label: "Create Idea",
    icon: Lightbulb,
  },
  {
    href: "/dashboard/member/my-ideas",
    label: "My Ideas",
    icon: FileText,
  },
];

export function Sidebar2({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    setSidebarOpen(open);
  }, [open, setSidebarOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-background rounded-lg shadow-sm border"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay for mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={handleClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen w-64 border-r bg-background z-40 transition-transform duration-300 ease-in-out",
          "flex flex-col",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4 border-b">
          <h1 className="text-xl font-semibold">Idea Portal</h1>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} onClick={handleClose}>
              <div
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent transition-colors",
                  pathname === href && "bg-accent"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 cursor-pointer"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
            {isLoggingOut && <span className="ml-2 animate-spin">...</span>}
          </Button>
        </div>
      </aside>
    </>
  );
}
