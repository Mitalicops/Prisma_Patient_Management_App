"use client";

import { ColumnDef } from "@tanstack/react-table";

import { formatDateTime } from "@/lib/utils";
import Image from "next/image";

import StatusBadge from "../patient-manager-component/StatusBadge";
import AppointmentModal from "../patient-manager-component/AppointmentModal";
import { Appointment, DoctorsAppointment } from "@/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const DoctorColumns: ColumnDef<DoctorsAppointment>[] = [
  {
    header: "#",
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },

  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      return <p className="text-14-medium">{appointment.patient.name}</p>;
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(appointment.schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={appointment.status} />
        </div>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <div className="flex gap-1">
          <AppointmentModal
            type="schedule"
            disabled={"scheduled" === appointment?.status}
            patientId={appointment.patient.id}
            userId={appointment.id}
            appointment={appointment}
            role="Doctor"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />

          <AppointmentModal
            type="cancel"
            role="Doctor"
            disabled={"cancelled" === appointment?.status}
            patientId={appointment.patient.id}
            userId={appointment.id}
            appointment={appointment}
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];
