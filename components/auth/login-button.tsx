"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

interface LoginButtonProps {
  children?: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  role?: any;
}

export const LoginButton = ({
  children,
  mode = "redirect",
  role,
  asChild,
}: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    //router.push("/auth/login");
    signIn("credentials", {
      callbackUrl:
        role === "Admin"
          ? "/admin"
          : role === "Doctor"
          ? "/dashboard"
          : "/patient-admin",
    });
  };

  if (mode === "modal") {
    return <span>TODO: IMPLENT MODAL</span>;
  }
  return (
    <Button
      variant="landing_page"
      size="lg"
      onClick={onClick}
      className="cursor-pointer"
    >
      Sign In
    </Button>
  );
};
