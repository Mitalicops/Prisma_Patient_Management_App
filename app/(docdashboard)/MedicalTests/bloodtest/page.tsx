import {
  getAllDoctors,
  getDoctorAppointments,
  getUniquePatientsByDoctor,
} from "@/actions/doctor.actions";
import BloodTestForm from "@/components/forms/BloodTest";
import { currentUser } from "@/lib/auth";
import { Doctor } from "@/next-auth";
import Link from "next/link";
import React from "react";

const BloodTestPage = async () => {
  const TheCurrentDoc = await currentUser();
  const ThePatientForTest = await getUniquePatientsByDoctor(TheCurrentDoc?.id!);

  console.log("SEEEEEE", { ThePatientForTest });
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container !m-0">
          <BloodTestForm
            TheCurrentDoc={TheCurrentDoc as Doctor}
            ThePatientForTest={ThePatientForTest}
          />

          <div className="text-14-regular mt-20 items-center flex gap-2 justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse
            </p>

            <Link
              href="/admin"
              className="text-white bg-green-500 rounded-lg px-6 py-[5px]"
            >
              Admin
            </Link>

            <Link
              className="text-white bg-green-500 rounded-lg px-6 py-[5px]"
              href={`/auth/login`}
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BloodTestPage;
