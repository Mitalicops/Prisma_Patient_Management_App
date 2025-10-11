import { getAppointment } from "@/actions/appointment.actions";
import { getDoctorWithAppointmentId } from "@/actions/doctor.actions";
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaRegCalendarDays } from "react-icons/fa6";

const SuccessPage = async ({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) => {
  const { appointmentId } = await params;

  console.log(appointmentId);

  const appointment = await getAppointment(appointmentId);
  const doctor = await getDoctorWithAppointmentId(appointmentId);

  console.log(appointment, doctor);

  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success gif"
          />

          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">Appointment request</span> has
            been successfully submitted
          </h2>
          <p>We will shortly be in touch to confirm your appointment.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>

          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || "/assets/default-pic.jpg"}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>-
            <p className="whitespace-nowrap">{doctor?.specialization}</p>
          </div>

          <div className="flex items-center gap-2">
            <FaRegCalendarDays height={25} width={25} />

            <p>{formatDateTime(appointment?.schedule!).dateTime}</p>
          </div>
        </section>

        <div className="flex items-center gap-5 flex-col lg:flex-row">
          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/auth/${appointment?.patientId}/new-appointment`}>
              New Appointment
            </Link>
          </Button>

          <Button variant="outline" className="shad-primary-btn" asChild>
            <Link href={`/patient-admin`}>My Admin Dashboard</Link>
          </Button>
        </div>

        <p className="copyright">© 2024 CarePulse</p>
      </div>
    </div>
  );
};

export default SuccessPage;
