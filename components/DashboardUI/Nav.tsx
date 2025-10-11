"use client";

import Link from "next/link";
import React, { useState } from "react";
import { UserButton } from "../auth/user-button";
import { cn } from "@/lib/utils";
import { NavLinks } from "@/constants";
import { usePathname } from "next/navigation";

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="max-[756px]:hidden flex flex-col h-screen bg-slate-900 rounded-md p-4 gap-4 max-sm:gap-2 max-sm:p-2 ">
      {NavLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <div
            key={link.id}
            className={cn(
              `p-2 rounded-md text-center duration-500 ease-in-out ${
                isActive ? "text-white bg-emerald-900" : "text-gray-400"
              }`
            )}
          >
            <Link href={link.href}>{link.name}</Link>
          </div>
        );
      })}
    </nav>
  );
};

export default Nav;

export const SecondNav = ({ isDocAvailable }: { isDocAvailable: boolean }) => {
  return (
    <div className="flex w-full items-center justify-center p-[2%] bg-emerald-800 rounded-tl-xl rounded-tr-xl">
      <div className="flex items-center justify-between w-full">
        <h2 className="font-semibold text-[18px]">Doctor Dashboard</h2>

        <UserButton type="doctor" initialDocAvailability={isDocAvailable} />
      </div>
    </div>
  );
};
