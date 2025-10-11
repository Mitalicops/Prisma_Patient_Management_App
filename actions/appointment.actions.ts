"use server";

import {
  CreateAppointmentParams,
  getUserAppointments,
  UpdateAppointmentParams,
} from "@/types";
import { db } from "@/lib/db";
import { formatDateTime, parseStringify } from "@/lib/utils";
import { getUserById, getUserByTheirId } from "@/data/user";
import { sendWelcomeEmail } from "@/lib/mail";
import { currentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export const CreateAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const existingUser = await getUserByTheirId(appointment.patientId);

    const newAppointment = await db.appointment.create({
      data: {
        schedule: appointment.schedule,
        reason: appointment.reason,
        note: appointment.note,
        status: appointment.status,
        patient: { connect: { id: existingUser.id } },
        Doctor: { connect: { id: appointment.doctorId } },
      },
    });

    return parseStringify(newAppointment);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAppointmentsForUser = async ({
  id: userId,
}: getUserAppointments) => {
  try {
    // Fetch the patient details using the userId
    const patient = await db.patient.findUnique({ where: { id: userId } });

    if (!patient) {
      throw new Error("Patient not found");
    }

    // Fetch appointment details for the logged-in patient
    const appointments = await db.appointment.findMany({
      where: {
        patientId: patient.id,
      },
      orderBy: {
        schedule: "desc",
      },
      include: { patient: true, Doctor: true },
    });

    // Initialize counts
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    // Reduce to count appointments by status
    const counts = appointments.reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduledCount += 1;
      } else if (appointment.status === "pending") {
        acc.pendingCount += 1;
      } else if (appointment.status === "cancelled") {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCounts);

    // Prepare the data
    const data = {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };

    return parseStringify(data);
  } catch (error) {
    console.log("An error occurred in fetching the appointments", error);
  }
};

export const getRecentAppointmentsList = async () => {
  try {
    // Fetch recent appointments ordered by creation date (assuming schedule is the creation date)
    const appointments = await db.appointment.findMany({
      orderBy: {
        schedule: "desc",
      },
      include: { patient: true, Doctor: true },
    });

    // Initialize counts
    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    // Reduce to count appointments by status
    const counts = appointments.reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduledCount += 1;
      } else if (appointment.status === "pending") {
        acc.pendingCount += 1;
      } else if (appointment.status === "cancelled") {
        acc.cancelledCount += 1;
      }
      return acc;
    }, initialCounts);

    // Prepare the data
    const data = {
      totalCount: appointments.length,
      ...counts,
      documents: appointments,
    };

    return parseStringify(data);
  } catch (error) {
    console.log("An error occurred in fetching the appointments", error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
    });
    return appointment
  } catch (error) {
    console.log("An error occurred in fetching the appointments", error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
  type,
}: UpdateAppointmentParams) => {
  try {
    const user = await currentUser();

    if (!user) {
      throw new Error("No user is currently authenticated");
    }
    // Find the patient's email using their user ID
    if (!user || !user.email) {
      throw new Error("User email not found");
    }

    console.log(user.email);

    const updatedAppointment = await db.appointment.update({
      where: { id: appointmentId },
      data: {
        schedule: appointment.schedule,
        primaryPhysician: appointment.primaryPhysician,
        status: appointment.status,
        cancellationReason: appointment.cancellationReason,
      },
    });

    if (!updatedAppointment) {
      throw new Error("Could not update appointment");
    }

    const emailMessage = `Hi, this is CarePulse. ${
      type === "schedule"
        ? `Your appointment has been scheduled for ${
            formatDateTime(appointment.schedule).dateTime
          } with Dr. ${appointment.primaryPhysician}.`
        : `We regret to inform you that your appointment has been cancelled. Due to the following Reason: ${appointment.cancellationReason}`
    }`;

    await sendWelcomeEmail(user.email, emailMessage, type);

    revalidatePath(`/`);
    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log("An error occurred while updating an appointment:", error);
    throw error;
  }
};
