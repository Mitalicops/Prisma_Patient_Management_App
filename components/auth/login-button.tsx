"use client";

import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
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

    if (role === "Doctor") {
      router.push("/dashboard");
    } else if (role === "Patient") {
      router.push("/patient-admin");
    } else if (role === "Admin") {
      router.push("/admin");
    }
  };

  if (mode === "modal") {
    return <span>TODO: IMPLENT MODAL</span>;
  }
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
