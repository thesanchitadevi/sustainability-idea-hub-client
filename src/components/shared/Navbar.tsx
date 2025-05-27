"use client";

import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

import { useUser } from "@/context/userContext";
import { logOut } from "@/service/auth";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { orderedIdeaSelector, removeIdea } from "@/redux/features/cartSlice";


import {
  Sheet,
  SheetContent,
    SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import AddToCartItems from "./addTocart/AddToCartItems";


// { user }: { user: ICurrentUser  }
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();
  const router = useRouter();
  
  const [isSheetOpen, setIsSheetOpen] = useState(false); 
  // console.log("i akdjfl  = ", user)

  const addTocartIdeas = useAppSelector(orderedIdeaSelector);
  const disPatch = useAppDispatch()
  // console.log("add to cart = ", addTocartIdeas);

  let role;
  if (user) {
    role = user?.role === "ADMIN" ? "admin" : "member";
  }

  const handleLogout = async () => {
    await logOut();
    router.push("/login");
    // router.refresh();
  };

  const handleProceedCheckout = () => {
    if(!user) {
      setIsSheetOpen(false);
      router.push(`/login`)
    }
    else {
      setIsSheetOpen(false);
    router.push('/checkout')
    }
  }
  // Base nav links that are always shown
  const baseNavLinks = [
    { name: "Home", href: "/" },
    { name: "Ideas", href: "/idea" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
  ];

  // Add Dashboard link only if user exists
  const navLinks = user
    ? [...baseNavLinks, { name: "Dashboard", href: `/dashboard/${role}` }]
    : baseNavLinks;

  const handleCartDelete = (id:string) => {
    disPatch(removeIdea(id))
  }  

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
            <div className="relative">
              {/* add to cart */}
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger className="w-10 cursor-pointer">
                  <ShoppingCart className=" " size={24} />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="text-xl text-green-500">Your Cart Items</SheetTitle>
                    {
                      addTocartIdeas?.length == 0 ? (
                        <div className="mt-10 text-center">
                          <p className="text-gray-700 text-xl">Your Cart is Empty</p>
                        </div>
                      ) :  <AddToCartItems items ={addTocartIdeas} onDelete={handleCartDelete}></AddToCartItems>
                    }
                    
                      {/* <AddToCartItems items ={addTocartIdeas} onDelete={handleCartDelete}></AddToCartItems> */}
                    
                  </SheetHeader>
                  {addTocartIdeas?.length > 0 && <div className="text-center space-y-3 p-4">
                    <p className="text-center text-lg">Total : {addTocartIdeas?.length * 200} BDT </p>
                    <Button className="cursor-pointer w-full" onClick={handleProceedCheckout}>PROCEED TO CHECKOUT</Button>
                  </div>}
                </SheetContent>
              </Sheet>
              {/* <Button variant="outline"  className="rounded-full  bg-white text-gray-800  hover:bg-white cursor-pointer"><ShoppingCart className=" " size={24}  /></Button> */}
              <p className="absolute -top-2 -right-1 rounded-full w-6 h-6 flex items-center justify-center bg-green-500 text-white">
                {addTocartIdeas?.length}
              </p>
            </div>
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
            {user && (
              <Button
                onClick={handleLogout}
                variant="outline"
                className=" cursor-pointer text-lg"
              >
                Logout
              </Button>
            )}
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
          <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-t shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 space-y-4">
              {" "}
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
                    <Button className="w-full cursor-pointer">
                      My Profile
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link href="/login">
                      <Button variant="outline" className="w-full">
                        Login
                      </Button>
                    </Link>
                    <Link href="/register">
                      <Button className="w-full">Register</Button>
                    </Link>
                  </div>
                )}
                {user && (
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    className=" cursor-pointer w-full text-lg"
                  >
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
