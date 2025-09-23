"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar"
export default function Layoutwraper({ children }) {
  const pathname = usePathname();
  // jin routes par Navbar nahi chahiye
  const noNavbarRoutes = ["/pages/login"];
  const shouldShowNavbar = !noNavbarRoutes.includes(pathname);
  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  );
}
