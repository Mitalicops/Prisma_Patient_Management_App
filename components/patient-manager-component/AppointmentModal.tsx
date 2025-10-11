"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

import { Button } from "../ui/button";
import { Appointment } from "@/types";
import { AppointmentForm } from "../forms/AppointmentForm";
import { Doctor } from "@/next-auth";
import { Specializations } from "@/constants";

const AppointmentModal = ({
  type,
  patientId,
  userId,
  role,
  appointment,
  doctors,
  disabled,
}: {
  type: "schedule" | "cancel";
  patientId: string | null;
  userId: string;
  role: "patient" | "admin" | "doctor";
  appointment?: Appointment;
  title: string;
  description: string;
  disabled?: boolean;
  doctors?: Doctor[];
}) => {
  const [Open, setOpen] = useState(false);

  return (
    <Dialog open={Open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          variant="ghost"
          className={`capitalize ${type === "schedule" && "text-green-500"} ${
            type === "cancel" && "text-red-700"
          }`}
        >
          {type}
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{type} Appointment</DialogTitle>
          <DialogDescription>
            Please Fill in the following details to {type} an appointment
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm
          userId={userId}
          patientId={patientId}
          doctors={doctors}
          type={type}
          role={role}
          appointment={appointment}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
export default AppointmentModal;
