"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { MdOutlineAlternateEmail } from "react-icons/md";

import { useState } from "react";
import { LoginSchema } from "@/lib/validation";

import { RiLockPasswordFill } from "react-icons/ri";
import { FormFieldType } from "@/constants";

import CustomForm from "../patient-manager-component/CustomForm";
import { SubmitButton } from "../patient-manager-component/SubmitButton";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { currentRole, currentUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { getUserByEmail } from "@/data/user";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setIsLoading(true);

    const user = {
      email: values.email,
      password: values.password,
    };

    const newUser = await login(user);

    if (newUser?.error) {
      form.reset();
      setError(newUser.error);
      setIsLoading(false);
      return;
    }

    if (newUser?.success) {
      form.reset();
      setSuccess(newUser.success);

      //const role = newUser.role;

      //        if (role === "Admin") {
      //        router.push("/admin");
      //    } else if (role === "Doctor") {
      //    router.push("/dashboard");
      // } else if (role === "Patient") {
      // router.push("/patient-admin");
      //}
      setIsLoading(false);
      return;
    }

    if (newUser?.twoFactor) {
      setShowTwoFactor(true);
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi There, Login👋</h1>
          <p className="text-dark-700">Schedule Your First Appointment</p>
        </section>

        {showTwoFactor && (
          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="code"
            label="Code"
            placeholder="Enter Your 2FA Code"
            iconSrc={<MdOutlineAlternateEmail />}
            iconAlt="code"
          />
        )}
        {!showTwoFactor && (
          <>
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="johndoe@jsmastery.pro"
              iconSrc={<MdOutlineAlternateEmail />}
              iconAlt="email"
            />
            <CustomForm
              fieldType={FormFieldType.PASSWORD}
              control={form.control}
              name="password"
              label="Password"
              placeholder="********"
              iconSrc={<RiLockPasswordFill />}
              iconAlt="password"
            />
          </>
        )}

        <FormError message={error} />
        <FormSuccess message={success} />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};
