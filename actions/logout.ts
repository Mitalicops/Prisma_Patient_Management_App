"use server";

import { signOut } from "@/auth";


export const logout = async () => {
  //U CAN DO SOME SERVER STUFF OR ACTION HERE BEFORE U SIGN OUT THE USER;
  try {
    await signOut();

    window.location.href = "/"; // force reload

  } catch (error) {
    console.error("Logout error:", error);
  }
};
