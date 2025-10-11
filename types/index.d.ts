import { Doctor, Patient, TheUser } from "@/next-auth";
import { AppointmentStatus, Gender } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type Appointment = {
  id: string;
  patient: Patient;
  schedule: Date;
  status: AppointmentStatus;
  // primaryPhysician: string;
  reason?: string;
  note?: string;
  patientId?: string;
  doctorId: string;
  Doctor?: Doctor;
  cancellationReason?: string | null;
};

export type DoctorsAppointment = {
  id: string;
  patient: TheUser["patient"];
  schedule: Date;
  status: AppointmentStatus;
  doctorId: string;
  patientId?: string;
};

//declare type Gender = "Male" | "Female" | "Other";
declare type Status = "pending" | "scheduled" | "cancelled";

//export type CreateUserParams = DefaultSession["user"] & {
// name: string;
//email: string;
//phone: string;
//password: string;
//role?: UserRole;
//isTwoFactorEnabled?: boolean;
//};

declare interface User extends Patient {
  id: string;
}

declare type CreateAppointmentParams = {
  patientId: string;
  reason: string;
  schedule: Date;
  status: Status;
  doctorId: string;
  note: string | undefined;
};

//declare type UpdateAppointmentParams = {
//appointmentId: string;
//appointment: Appointment;
//patientId: string;
//type: string;
//};

type UpdateAppointmentParams = {
  appointmentId: string;
  patientId: string | null;
  appointment: {
    schedule: Date;
    reason?: string;
    note?: string;
    primaryPhysician?: string;
    status?: AppointmentStatus;
    cancellationReason?: string;
  };
  type: string;
};

declare interface getUserAppointments {
  id: string | undefined;
}

export type AIReport = {
  summary: string; // overall interpretation in plain language
  abnormalFindings: {
    parameter: string; // e.g., "Hemoglobin"
    value: string; // e.g., "10.2 g/dL"
    normalRange: string; // e.g., "13.5–17.5 g/dL"
    interpretation: string; // e.g., "Low - Possible anemia"
  }[];
  recommendations: string[]; // medical suggestions (e.g., “Repeat test in 1 week”)
  lifestyleAdvice: string[]; // plain health suggestions (e.g., “Increase iron intake”)
};
