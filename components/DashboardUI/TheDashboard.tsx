import React from "react";
import { DoctorColumns } from "../Patient-Admin-table/DoctorColumns";
import { DataTable } from "../Patient-Admin-table/DataTable";
import {  TheUser } from "@/next-auth";

interface DoctorInfo {
  doctor: TheUser;
}

const TheDashboard = ({ doctor }: DoctorInfo) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl text-emerald-200 font-semibold mb-6">
        Welcome, {doctor?.name}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        <div className="p-3 rounded-lg bg-slate-600 w-full flex flex-col gap-1 items-center">
          <h3 className="text-emerald-200 font-semibold">5</h3>
          <p className="text-gray-400">Total patients</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-600 w-full flex flex-col gap-1 items-center">
          <h3 className="text-emerald-200 font-semibold">5</h3>
          <p className="text-gray-400">Upcoming Appointments</p>
        </div>

        <div className="p-3 rounded-lg bg-slate-600 w-full flex flex-col gap-1 items-center">
          <h3 className="text-emerald-200 font-semibold">3</h3>
          <p className="text-gray-400">Tasks</p>
        </div>
        <div className="p-3 rounded-lg bg-slate-600 w-full flex flex-col gap-1 items-center">
          <h3 className="text-emerald-200 font-semibold">12</h3>
          <p className="text-gray-400">Reports</p>
        </div>
      </div>


    </div>
  );
};

export default TheDashboard;
