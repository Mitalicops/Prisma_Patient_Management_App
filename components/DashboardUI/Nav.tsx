"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserButton } from "../auth/user-button";
import { cn } from "@/lib/utils";
import { NavLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { CircleX, Cross, MenuIcon } from "lucide-react";

const Nav = ({
  isDocAvailable,
  children,
}: {
  isDocAvailable: boolean;
  children?: React.ReactNode;
}) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // State to store the current window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update the windowWidth state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial call to set the width when the component mounts
    handleResize();

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount and unmount

  return (
    <>
      <div>
        <div className="flex flex-col w-full items-center justify-center p-[2%] bg-emerald-800 rounded-tl-xl rounded-tr-xl">
          <div className="flex items-center justify-between w-full">
            <h2 className="font-semibold text-[18px]">Doctor Dashboard</h2>

            <div className="flex items-center gap-4">
              <div className="max-[756px]:block hidden transition-all duration-500 cursor-pointer">
                {open ? (
                  <CircleX onClick={() => setOpen(false)} />
                ) : (
                  <MenuIcon onClick={() => setOpen(true)} />
                )}
              </div>

              <UserButton
                type="doctor"
                initialDocAvailability={isDocAvailable}
              />
            </div>
          </div>
        </div>

        <div className="flex">
          <div
            className={cn(
              `hidden flex-col h-screen bg-slate-900 max-[756px]:flex rounded-md transition-all duration-500 ease-in-out p-4 gap-4 max-sm:gap-2 max-sm:p-2 ${
                open ? "w-[30%]" : "w-0 h-0 bg-transparent"
              }`
            )}
          >
            {NavLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <div
                  key={link.id}
                  className={cn(
                    `p-2 rounded-md text-center duration-500 ease-in-out ${
                      isActive ? "text-white bg-emerald-900" : "text-gray-400"
                    } ${open ? "" : "hidden"}`
                  )}
                >
                  <Link href={link.href}>{link.name}</Link>
                </div>
              );
            })}
          </div>

          {windowWidth > 756 && (
            <div
              className={`flex flex-col h-screen bg-slate-900 rounded-md  p-4 gap-4 max-sm:gap-2 max-sm:p-2`}
            >
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
            </div>
          )}

          <div className={`${open ? "w-[75%]" : "w-full"}`}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Nav;

export const SecondNav = ({ isDocAvailable }: { isDocAvailable: boolean }) => {
  return <></>;
};
