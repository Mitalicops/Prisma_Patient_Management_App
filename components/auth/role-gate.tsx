"use client";

import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { FormError } from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

export const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();

  console.log({ role, allowedRole });

  if (role !== allowedRole) {
    return (
      <FormError message="You Do Not Have Permission To View This Content" />
    );
  }

  return <>{children}</>;
};
