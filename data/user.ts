import { db } from "@/lib/db";
import { parseStringify } from "@/lib/utils";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.patient.findUnique({ where: { email }});

    const doctor = await db.doctor.findUnique({ where: { email } });

    return {
      user: user,
      doctor: doctor,
    };
  } catch {
    return null;
  }
};

export const getUserByTheirId = async (id: string) => {
  try {
    const user = await db.patient.findUnique({ where: { id } });

    return parseStringify(user);
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.patient.findUnique({ where: { id } });

    const doctor = await db.doctor.findUnique({ where: { id } });

    return {
      user,
      doctor,
    };
  } catch {
    return null;
  }
};

export const getDocById = async (id: string) => {
  try {
    const doctor = await db.doctor.findUnique({ where: { id } });

    return parseStringify(doctor);
  } catch {
    return null;
  }
};
