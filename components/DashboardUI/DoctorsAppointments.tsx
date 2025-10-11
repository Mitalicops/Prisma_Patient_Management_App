import React from "react";
import { DoctorColumns } from "../Patient-Admin-table/DoctorColumns";
import { DataTable } from "../Patient-Admin-table/DataTable";
import { getDoctorAppointments } from "@/actions/doctor.actions";
import { currentUser } from "@/lib/auth";

const DoctorsAppointments = ({TheAppointments}: any) => {

  return (
    <div className="">
      <DataTable columns={DoctorColumns} data={TheAppointments} />
    </div>
  );
};

export default DoctorsAppointments;
