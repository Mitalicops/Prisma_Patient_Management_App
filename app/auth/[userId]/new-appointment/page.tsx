import { getAllDoctors } from "@/actions/doctor.actions";
import { getPatient } from "@/actions/patient.actions";
import { AppointmentForm } from "@/components/forms/AppointmentForm";

import {  User } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewAppointment = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userId = (await params).userId;
  const patient = await getPatient(userId);
  const doctors = await getAllDoctors();
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Image
            src="/assets/icons/logo.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm
            type="create"
            role={patient?.role!}
            userId={userId}
            doctors={doctors}
            patientId={patient?.id!}
          />

          <p className="copyright mt-10 py-10">© 2024 CarePulse</p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        height={1000}
        width={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
};

export default NewAppointment;
