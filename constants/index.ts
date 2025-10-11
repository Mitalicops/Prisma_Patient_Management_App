import { Gender, UserRole } from "@prisma/client";
import { RiCalendarScheduleFill } from "react-icons/ri";

export const GenderOptions = ["Male", "Female", "Other"];
export const RoleOptions = ["Admin", "Doctor", "Patient"];

export const NavLinks = [
  {
    id: 1,
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    id: 2,
    name: "Appointments",
    href: "/appointments",
  },
  //{
  // id: 3,
  //  name: "Patients",
  //  href: "/patients",
  //},

  {
    id: 4,
    name: "MedicalTests",
    href: "/MedicalTests",
  },
  //{
  //  id: 5,
  // name: "Settings",
  // href: "/settings",
  //},
];

export const BloodGroups = [
  {
    id: 1,
    name: "A+",
  },
  {
    id: 2,
    name: "A-",
  },
  {
    id: 3,
    name: "B+",
  },
  {
    id: 4,
    name: "B-",
  },
  {
    id: 5,
    name: "AB+",
  },
  {
    id: 6,
    name: "AB-",
  },
  {
    id: 7,
    name: "O+",
  },
  {
    id: 8,
    name: "O-",
  },
];

export const PatientFormDefaultValues = {
  id: "",
  name: "",
  email: "",
  phone: "",
  password: "",
  birthDate: new Date(Date.now()),
  gender: "Male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationDocumentUrl: "",
  identificationNumber: "",
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,

  isTwoFactorEnabled: false,
  role: UserRole.Patient,
};

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PASSWORD = "password",
  NUMBER = "number",
}

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Specializations = [
  {
    name: "Ophthalmologist",
  },
  {
    name: "Cardiologist",
  },
  {
    name: "Dermatologist",
  },
  {
    name: "Pediatrician",
  },
  {
    name: "Neurologist",
  },
  {
    name: "Gynecologist",
  },
  {
    name: "Orthopedic Surgeon",
  },
  {
    name: "General Practitioner",
  },
  {
    name: "Dentist",
  },

  {
    name: "Oncologist",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
