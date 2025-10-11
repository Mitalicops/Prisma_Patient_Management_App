"use client";

import { logout } from "@/actions/logout";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export const LogoutButton = ({ children, className }: LogoutButtonProps) => {
  const router = useRouter() 
  const onClick = async () => {
    await logout();


    router.push("/auth/login");
    
  };

  return (
    <span className={`cursor-pointer ${className}`} onClick={onClick} >
      {children}
    </span>
  );
};
