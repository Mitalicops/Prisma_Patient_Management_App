"use client";

import React, { useState } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { Button } from "../ui/button";
import Image from "next/image";
import { LoginButton } from "../auth/login-button";

interface MenuProps {
  className?: string;
}

const Menu = ({ className }: MenuProps) => (
  <>
    <p>
      <a href="#Home" className={className}>
        Home
      </a>
    </p>
    <p>
      <a href="#aboutus" className={className}>
        About us
      </a>
    </p>
    <p>
      <a href="#Doctors" className={className}>
        Doctors
      </a>
    </p>
    <p>
      <a href="#Services" className={className}>
        Services
      </a>
    </p>
  </>
);

const Navbar = ({ role }: any) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <nav className="z-10 w-full h-full xl:py-30 px-[5%] bg-white shadow-lg  transition-all duration-500 ease-in-out">
      <div className="rounded-full w-full gap-3 pt-3 pb-3 sm:p-4 lg:p-5 flex justify-between items-center">
        <a
          href="#"
          className="font-secondary text-gray-700 text-2xl font-medium"
        >
          <Image
            src="/assets/icons/logo.svg"
            alt="logo"
            width={50}
            height={50}
            className=""
          />
        </a>
        <ul className="flex p-[1%] rounded-[50px] ">
          <Menu
            className="mx-5 py-1 hidden lg:block text-gray-700 text-lg font-medium border-b-2 
             border-transparent transition-all hover:text-cyan-500 duration-500 ease-in-out"
          />
        </ul>
        <div className="">
          <LoginButton role={role} />
        </div>

        <div className="lg:hidden">
          {toggleMenu ? (
            <RiCloseLine
              className="text-gray-600"
              size={27}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              className="text-gray-600"
              size={27}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div className="absolute p-4 top-[80px] right-0 w-[250px] bg-cyan-600  shadow-lg rounded-md mt-2 transform origin-top scale-100 sm:scale-105 transition-transform">
              <div className="p-4 text-center flex flex-col gap-5">
                <Menu />
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
