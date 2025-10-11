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
    signIn("credentials");
  };

  if (mode === "modal") {
    return <span>TODO: IMPLENT MODAL</span>;
  }
  console.log({ role });
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
