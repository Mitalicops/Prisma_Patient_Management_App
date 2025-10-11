"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";

import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/lib/validation";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validiatedFields = NewPasswordSchema.safeParse(values);

  if (!validiatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { password } = validiatedFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "invalid token" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email Does Not exist" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.patient.update({
    where: { id: existingUser?.user?.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "password updated" };
};
