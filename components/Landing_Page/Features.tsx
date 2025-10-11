"use client";

import React, { useState } from "react";

import { RiAccountCircleFill, RiAddBoxFill } from "react-icons/ri";
import Image from "next/image";

import { TbHandClick } from "react-icons/tb";
import { CustomButton } from "../../constants/Button";
import { Doctor } from "@/next-auth";
//import Section from "@/constants/Section";

const Features = ({ doctors }: { doctors: Doctor[] }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <section className="p-[5%]">
      <div className="">
        <h1 className="text-black text-[2rem] font-bold text-center">
          Here Is What You Need To Do in Just three Easy Steps
        </h1>
        <p className="text-gray-500 text-[1rem] font-normal text-center mt-2">
          lorem ipsum dolor sit amit pur gonda lir goch paour tire lar
        </p>
        <div className="grid md:grid-cols-3 gap-7 grid-cols-[minmax(200px,1fr)] grid-flow-row mt-14">
          <div className="p-[1.5rem]  bg-slate-100 shadow-2xl rounded-xl">
            <h1 className="text-black text-[1.5rem] font-bold flex items-center gap-4">
              <RiAddBoxFill
                className="p-2 bg-blue-300 text-purple-200"
                size={40}
              />
              Lorem Ipsum
            </h1>

            <p className="text-gray-500 text-[1rem] font-normal mt-2">
              lorem ipsum dolor sit amit pur gonda lir goch paour tire lar lorem
              ipsum dolor sit amit pur gonda lir goch paour tire lar lorem ipsum
              dolor sit amit
            </p>
          </div>
          <div className="p-[1.5rem] bg-slate-100 shadow-2xl rounded-xl">
            <h1 className="text-black text-[1.5rem] font-bold flex items-center gap-4">
              <RiAddBoxFill
                className="p-2 bg-blue-300 text-red-200"
                size={40}
              />
              Lorem Ipsum
            </h1>

            <p className="text-gray-500 text-[1rem] font-normal mt-2">
              lorem ipsum dolor sit amit pur gonda lir goch paour tire lar lorem
              ipsum dolor sit amit pur gonda lir goch paour tire lar lorem ipsum
              dolor sit amit
            </p>
          </div>
          <div className="p-[1.5rem] bg-slate-100 shadow-2xl rounded-xl">
            <h1 className="text-black text-[1.5rem] font-bold flex items-center gap-4">
              <RiAddBoxFill
                className="p-2 bg-blue-300 text-yellow-200"
                size={40}
              />
              Lorem Ipsum
            </h1>

            <p className="text-gray-500 text-[1rem] font-normal mt-2">
              lorem ipsum dolor sit amit pur gonda lir goch paour tire lar lorem
              ipsum dolor sit amit pur gonda lir goch paour tire lar lorem ipsum
              dolor sit amit
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="grid lg:grid-cols-2 gap-12 mb-8 grid-cols-1 mt-14">
          <div className="relative bg-slate-100 p-5 rounded-xl">
            <Image
              src="/assets/doc-img.jpg"
              width={500}
              height={500}
              alt="doc-img"
              className="w-full object-cover h-full"
            />

            <div className="absolute bottom-10 md:right-10 right-0  bg-slate-100 p-5 rounded-xl">
              <h1 className="text-black text-[2rem] font-bold flex items-center gap-3">
                Available Doctors
                <TbHandClick
                  size={40}
                  className="text-cyan-500 shadow-2xl rounded-full cursor-pointer"
                  onClick={toggleVisibility}
                />
              </h1>
              <p className="text-gray-500 text-[1rem] font-normal mb-5">
                Online Doctors
              </p>

              {isVisible && (
                <>
                  <div>
                    {doctors.slice(0, 3).map((doctor) => (
                      <div
                        key={doctor.name}
                        className="flex items-center mt-3 justify-normal gap-5"
                      >
                        <Image
                          src={doctor.image || "/assets/default-pic.jpg"}
                          width={50}
                          height={50}
                          alt={doctor.name}
                          className="rounded-full border border-dark-500"
                        />
                        <div>
                          <h1 className="text-black text-[1.3rem] font-bold">
                            {doctor.name}
                          </h1>
                          <p className="text-gray-500 text-[1rem] font-normal">
                            fkshfkhfkshfs
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-6">
                    <CustomButton className="rounded-[10px] ">
                      Contact Now
                    </CustomButton>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-slate-100 p-10 rounded-xl">
            <h1 className="text-black text-[2rem] font-bold">
              The Best Possible Care for your Health is our top priority
            </h1>
            <p className="text-gray-500 text-[1rem] font-normal mt-8 mb-8">
              ipsum dolor sit amit pur gonda lir goch paour tire lar lorem ipsum
              dolor sit amit hejakdhakf hfdhakfhkahf lhkhafkahf ahfkahfkahfafh
              ahfkahf
            </p>

            <div className="text-center md:text-left">
              <div className="flex items-center flex-col md:flex-row gap-4">
                <RiAccountCircleFill
                  size={40}
                  className="text-cyan-500 p-2 bg-white shadow-2xl rounded-full"
                />
                <h1 className=" text-black text-[1.2rem]  font-bold">
                  Effortles scheduling
                </h1>
              </div>
              <div>
                <p className="text-gray-500 text-[1rem] font-normal mt-3 mb-8 ">
                  ipsum dolor sit amit pur gonda lir goch paour tire lar lorem
                  ipsum dolor sit amit hejakdhakf hfdhakfhkahf lhkhafkahf
                  ahfkahfkahfafh ahfkahf
                </p>
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center flex-col md:flex-row gap-4">
                <RiAccountCircleFill
                  size={40}
                  className="text-cyan-500 p-2 bg-white shadow-2xl rounded-full"
                />
                <h1 className=" text-black text-[1.2rem]  font-bold">
                  Effortles scheduling
                </h1>
              </div>
              <div>
                <p className="text-gray-500 text-[1rem] font-normal mt-3 mb-8 ">
                  ipsum dolor sit amit pur gonda lir goch paour tire lar lorem
                  ipsum dolor sit amit hejakdhakf hfdhakfhkahf lhkhafkahf
                  ahfkahfkahfafh ahfkahf
                </p>
              </div>

              <div className="text-center md:text-left">
                <div className="flex items-center flex-col md:flex-row gap-4">
                  <RiAccountCircleFill
                    size={40}
                    className="text-cyan-500 p-2 bg-white shadow-2xl rounded-full"
                  />
                  <h1 className=" text-black text-[1.2rem]  font-bold">
                    Effortles scheduling
                  </h1>
                </div>
                <div>
                  <p className="text-gray-500 text-[1rem] font-normal mt-3 mb-8 ">
                    ipsum dolor sit amit pur gonda lir goch paour tire lar lorem
                    ipsum dolor sit amit hejakdhakf hfdhakfhkahf lhkhafkahf
                    ahfkahfkahfafh ahfkahf
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
