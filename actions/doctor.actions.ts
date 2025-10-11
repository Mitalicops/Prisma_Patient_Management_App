"use server";

import { Specializations } from "@/constants";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseStringify } from "@/lib/utils";
import { BloodTestSchema } from "@/lib/validation";
import { z } from "zod";

export const getDoctorAppointments = async (doctorId: string) => {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        doctorId: doctorId,
      },

      include: { patient: true, Doctor: true },
    });
    return appointments;
  } catch (error) {
    console.log({ error });
  }
};

export const getUniquePatientsByDoctor = async (doctorId: string) => {
  try {
    const appointments = await db.appointment.findMany({
      where: {
        doctorId: doctorId,
      },

      include: {
        patient: {
          select: {
            name: true,
            id: true,
            image: true,
          },
        },
      },
    });

    const uniquePatientsMap = new Map();
    appointments.forEach((a) => {
      uniquePatientsMap.set(a.patient.id, a);
    });

    return parseStringify([...uniquePatientsMap.values()]);
  } catch (error) {
    console.log({ error });
  }
};

export const getAllDoctors = async () => {
  try {
    const doctors = await db.doctor.findMany({
      where: {
        specialization: {
          in: Specializations.map((specialization) => specialization.name),
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        specialization: true,
      },
    });
    return doctors;
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to fetch doctors");
  }
};

export const getDoctorWithAppointmentId = async (appointmentId: string) => {
  try {
    const doctors = await db.doctor.findFirst({
      where: {
        appointments: {
          some: {
            id: appointmentId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        specialization: true,
      },
    });
    return doctors;
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to fetch doctors");
  }
};

export const TheDocAvailabilty = async (docId: string) => {
  try {
    const doctor = await db.doctor.findUnique({
      where: { id: docId },
    });

    return doctor?.isAvailable;
  } catch (error) {
    console.log(error);
  }
};

export const ToggleDocAvailability = async (checked: boolean) => {
  try {
    const TheDoctor = await currentUser();

    const doctor = await db.doctor.findUnique({
      where: {
        id: TheDoctor?.id,
      },
    });

    await db.doctor.update({
      data: {
        isAvailable: checked,
      },
      where: {
        id: doctor?.id,
      },
    });

    return doctor?.isAvailable;
  } catch (error) {
    console.log({ error });
    throw new Error("Failed to fetch doctors");
  }
};

export async function registerBloodTest(
  formData: z.infer<typeof BloodTestSchema>
) {
  try {
    const validatedData = BloodTestSchema.parse(formData);

    const newTest = await db.bloodTest.create({
      data: {
        ...validatedData,
        bloodGroup: validatedData.bloodGroup, // ensure bloodGroup is of type BloodGroup
        testDate: new Date(validatedData.testDate), // make sure it's in Date format
      },
    });

    return { success: true, data: newTest };
  } catch (error) {
    console.error("Failed to register blood test:", error);
    return { success: false, error: error };
  }
}
