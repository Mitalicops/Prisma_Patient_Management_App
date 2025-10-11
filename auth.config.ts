import bcrypt from "bcryptjs";

import credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./data/user";
import { LoginSchema } from "./lib/validation";
import { NextAuthConfig } from "next-auth";

export default {
  providers: [
    //google({
    //clientId: process.env.GOOGLE_CLIENT_ID,
    //clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //}),
    //Github({
    //clientId: process.env.GITHUB_CLIENT_ID,
    //clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //}),
    credentials({
      async authorize(credentials) {
        let Buffer = null;

        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          console.log({ user });

          if (user?.user !== null) {
            // if (!user.user || !user.user?.password)
            // return null;

            if (!user?.user || !user?.user?.password) return null;
            const passwordMatch = await bcrypt.compare(
              password,
              user.user.password
            );
            if (passwordMatch) Buffer = user.user;
          }

          if (user?.doctor !== null) {
            if (!user.doctor || !user.doctor?.password) return null;
            const passwordMatch = await bcrypt.compare(
              password,
              user.doctor.password
            );
            if (passwordMatch) Buffer = user.doctor;
          }
        }

        return Buffer;
      },
    }),
  ],

} satisfies NextAuthConfig;
