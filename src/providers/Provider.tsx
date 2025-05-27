"use client";
import { UserProvider } from "@/context/userContext";
import { ReactNode } from "react";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  return <UserProvider><StoreProvider>{children}</StoreProvider></UserProvider>;

  // now rap the root layout by this provider
};

export default Providers;
