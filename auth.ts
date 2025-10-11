import NextAuth from "next-auth";

import { getUserById } from "./data/user";
import { db } from "@/lib/db";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import authConfig from "./auth.config";
import { Gender, UserRole } from "@prisma/client";
import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
    signOut: "/auth/login",
  },
  /// events: {
  // async linkAccount({ user }) {
  //   await db.patient.update({
  //     where: { id: user.id },
  //     data: { emailVerified: new Date() },
  //   });
  // },
  // },
  callbacks: {
    async signIn({ user, account }) {
      //Allow OAuth without email verification
      //if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id!);

      if (existingUser?.user !== null) {
        //prevent sign in without email verfication
        if (!existingUser?.user.emailVerified) return false;

        if (existingUser.user.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.user.id
          );

          if (!twoFactorConfirmation) return false;

          //delete two factor confirmation for next sign in
          await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id },
          });
        }
      }

      if (existingUser?.doctor !== null) {
        if (existingUser.doctor.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
            existingUser.doctor.id
          );

          if (!twoFactorConfirmation) return false;

          //delete two factor confirmation for next sign in
          await db.twoFactorConfirmation.delete({
            where: { id: twoFactorConfirmation.id },
          });
        }
      }

      return true;
    },

    //problem here major one
    async session({ token, session }) {
      console.log({ sessionToken: token });

      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.role = token.role as UserRole;
      }

      //if (token.role && session.user) {
      //session.user.role = token.role as UserRole;
      // }

      if (session.user) {
        session.user.name = token.name as string;
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }

      //if (session.user.patient) {
      // session.user.patient.name = token.name!;
      //session.user.patient.id = token.sub!;
      // }

      return session;
    },

    //IMPORTANT: This is the JWT callback, not the session callback
    //This is called when the user signs in, and also when the session is created
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      if (existingUser.user === null) {
        token.sub = existingUser.doctor?.id;
        token.name = existingUser.doctor?.name;
        token.email = existingUser.doctor?.email;
        token.role = existingUser.doctor?.role;
      }

      //some problem with this

      if (existingUser.doctor === null) {
        //token.isOAuth = !!existingAccount;
        token.sub = existingUser.user?.id;
        token.isTwoFactorEnabled = existingUser.user?.isTwoFactorEnabled;
        token.name = existingUser.user?.name;
        token.email = existingUser.user?.email;
        token.role = existingUser.user?.role;
      }
      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
