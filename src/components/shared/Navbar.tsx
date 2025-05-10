"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { ICurrentUser } from "@/types";

export function Navbar({user} : {user : ICurrentUser}) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isLoggedIn = false; // Replace with your auth logic

  // console.log(user)
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Ideas", href: "/idea" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-lg font-semibold">
              <span className="text-green-600 font-quicksand">Eco</span>
              Hive
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-green-600 text-lg ${
                  pathname === link.href
                    ? "text-green-600"
                    : "text-foreground/60"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            {user ? (
              <Link href="/profile">
                <Button variant="outline" className="text-lg cursor-pointer">
                  My Profile
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button className="text-lg cursor-pointer">
                    Login / Register
                  </Button>
                </Link>
              </>
            )}
            <Button variant="outline" className=" cursor-pointer text-lg">
                        Logout
            </Button>
          </div>

          {/* Mobile Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-t shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-4">
              {" "}
              {/* Consistent max-w and padding */}
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block py-2 px-4 rounded-md transition-colors ${
                    pathname === link.href
                      ? "bg-green-50 text-green-600"
                      : "hover:bg-accent"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t space-y-2">
                {user ? (
                  <Link href="/profile">
                    <Button className="w-full cursor-pointer">My Profile</Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full">Register</Button>
                    </Link>
                  </>
                )}
                <Button variant="outline" className=" cursor-pointer w-full text-lg">
                        Logout
            </Button>
                
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
