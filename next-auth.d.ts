import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";
import { Status } from "./types";

export type TheUser = DefaultSession["user"] & {
    id: string | undefined;
    name: string | null | undefined;
    email: string;
    phone: string;
    //birthDate: Date;
    gender: Gender;
    //address?: string;
    //occupation?: string;
    //emergencyContactName: string;
    //emergencyContactNumber: string;
    //primaryPhysician: string;
    //insuranceProvider: string;
    //insurancePolicyNumber: string;
    //allergies?: string | undefined;
    //currentMedication?: string | undefined;
    //familyMedicalHistory?: string | undefined;
    //pastMedicalHistory?: string | undefined;
    //identificationType?: string | undefined;
    //identificationNumber?: string | undefined;
    //identificationDocumentUrl: string | undefined;
    //privacyConsent: boolean;
    //isTwoFactorEnabled?: boolean;
    //isOAuth?: boolean;
    role: String;
};


export type Patient = {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    birthDate: Date;
    gender: Gender;
    address?: string;
    occupation?: string;
    emergencyContactName: string;
    emergencyContactNumber: string;
    primaryPhysician: string;
    insuranceProvider: string;
    insurancePolicyNumber: string;
    allergies?: string | undefined;
    currentMedication?: string | undefined;
    familyMedicalHistory?: string | undefined;
    pastMedicalHistory?: string | undefined;
    identificationType?: string | undefined;
    identificationNumber?: string | undefined;
    identificationDocumentUrl: string | undefined;
    privacyConsent: boolean;
    isTwoFactorEnabled?: boolean;
    isOAuth?: boolean;
    role: UserRole;
};


export type Doctor = {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender?: Gender | null;
    birthDate?: Date | null;
    address?: string | null;
    specialization?: string | null;
    licenseNumber: string;
    yearsOfExperience?: number | undefined;
    education?: string | null;
    hospitalAffiliation?: string | null;
    isAvailable: boolean; // JSON in Prisma, so `any` here
    emailVerified?: Date | null;
    image?: string | null;
    password: string; // Required since doctors log in
    role: UserRole;
    //accounts?: Account[]; // Optional relation
    //appointments?: Appointment[]; // Optional relation
  };


declare module "next-auth" {
  interface Session {
    user: TheUser;
  }
}
