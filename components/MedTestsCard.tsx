import Link from "next/link";
import React from "react";
import { MdBloodtype } from "react-icons/md";

interface MedTestsCardProps {
  icon?: JSX.Element;
  title?: string;
  description?: string;
  href?: string;
}

const MedTestsCard = ({
  icon,
  title,
  description,
  href,
}: MedTestsCardProps) => {
  return (
    <Link href={href || "/dashboard"}>
      <div className="relative bg-slate-300 p-4 h-[90%] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="relative z-10 flex items-center h-full flex-col gap-1">
          {icon}
          <h3 className="text-lg font-semibold text-black">{title}</h3>
          <p className="text-dark-500 text-[14px] font-semibold">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MedTestsCard;
