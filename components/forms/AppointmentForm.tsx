"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";

import { useState } from "react";
import { getAppointmentSchema } from "@/lib/validation";
import { useRouter } from "next/navigation";

import { FormFieldType, Specializations } from "@/constants";

import Image from "next/image";
import { SelectGroup, SelectItem, SelectLabel } from "../ui/select";

import CustomForm from "../patient-manager-component/CustomForm";
import { SubmitButton } from "../patient-manager-component/SubmitButton";
import { Appointment } from "@/types";
import {
  CreateAppointment,
  updateAppointment,
} from "@/actions/appointment.actions";
import { AppointmentStatus, UserRole } from "@prisma/client";
import { randomUUID } from "crypto";
import { Doctor } from "@/next-auth";

type doctors = {
  name: string;
  email: string;
  id: string;
  image: string | null;
  specialization: string | null;
}[];

export const AppointmentForm = ({
  patientId,
  type,
  appointment,
  userId,
  doctors,
  setOpen,
  role,
}: {
  patientId: string | null;
  userId: string;
  role: UserRole;
  doctors?: doctors;
  type: "create" | "schedule" | "cancel";
  appointment?: Appointment;
  setOpen?: (open: boolean) => void;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      id: appointment?.id,
      schedule: appointment
        ? new Date(appointment.schedule)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      doctorId: appointment ? appointment.doctorId : "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof AppointmentFormValidation>) {
    setIsLoading(true);

    let status;

    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          patientId: userId,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as AppointmentStatus,
          doctorId: values.doctorId,
        };

        const appointment = await CreateAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/auth/${userId}/new-appointment/success?appointmentId=${appointment.id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          patientId,
          appointmentId: appointment?.id ?? "",
          appointment: {
            schedule: new Date(values?.schedule),
            status: status as AppointmentStatus,
            cancellationReason: values?.cancellationReason,
          },
          type,
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  let buttonLabel;

  switch (type) {
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;

    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === "create" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">New Appointment 👋</h1>
            <p className="text-dark-700">
              Request a new Appointment in a matter of seconds
            </p>
          </section>
        )}

        {type !== "cancel" && role === "admin" && (
          <CustomForm
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="doctorId"
            label="Doctor"
            placeholder="Select a Doctor"
          >
            {Specializations.map((specialization) => {
              const doctorsInSpecialization = doctors?.filter(
                (doctor) => doctor.specialization === specialization.name
              );

              if (!doctorsInSpecialization?.length) return null;

              return (
                <SelectGroup key={specialization.name}>
                  <SelectLabel>{specialization.name}</SelectLabel>
                  {doctorsInSpecialization.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <Image
                          src={doctor.image!}
                          width={32}
                          height={32}
                          alt={doctor.name}
                          className="rounded-full h-8 w-8 border border-dark-500"
                        />
                        <p>{doctor.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              );
            })}
          </CustomForm>
        )}

        {type !== "cancel" && (
          <>
            <CustomForm
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected Appointment date"
              showTimeSelect
              dateFormat="MM/dd/yyyy - hh:mm aa"
            />

            {role === "admin" ||
              (role === "doctor" && (
                <div className="flex flex-col gap-6 xl:flex-row">
                  <CustomForm
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="reason"
                    label="Reason for Appointment"
                    disabled
                    placeholder="Enter Reason For appointment"
                  />

                  <CustomForm
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="note"
                    label="Notes"
                    disabled
                    placeholder="Enter Notes"
                  />
                </div>
              ))}

            {role === "patient" && (
              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  label="Reason for Appointment"
                  disabled
                  placeholder="Enter Reason For appointment"
                />

                <CustomForm
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="note"
                  label="Notes"
                  disabled
                  placeholder="Enter Notes"
                />
              </div>
            )}
          </>
        )}

        {type === "cancel" && (
          <CustomForm
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for Cancellation"
            placeholder="Enter Reason For Cancellation"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
