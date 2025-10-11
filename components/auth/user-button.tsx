"use client";

import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogoutButton } from "./logout-button";
import { ExitIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Switch } from "../ui/switch";
import { ToggleDocAvailability } from "@/actions/doctor.actions";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface UserButtonProps {
  loggedInUserId?: string;
  type: "admin" | "patient" | "doctor";
  initialDocAvailability?: boolean;
}

export const UserButton = ({
  loggedInUserId,
  type,
  initialDocAvailability,
}: UserButtonProps) => {
  const [checked, setChecked] = useState(initialDocAvailability);
  const [loading, setLoading] = useState(false);

  const handleToggle = async (value: boolean) => {
    setLoading(true);
    try {
      await ToggleDocAvailability(value);
      setChecked(value);
    } catch (err) {
      console.error(err);
      alert("Failed to update availability");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60 p-4 border-[2px] border-solid border-gray-700 bg-blue-950"
        align="end"
      >
        <div className="flex flex-col gap-6">
          {type === "patient" && (
            <>
              <LogoutButton className="text-white bg-green-500 rounded-lg px-3 flex items-center gap-2 py-[5px]">
                <ExitIcon className="h-4 w-4" />
                Logout
              </LogoutButton>
              <Link
                href={`/auth/${loggedInUserId}/new-appointment`}
                className="text-white bg-green-500 rounded-lg px-3 py-[5px]"
              >
                New Appointment
              </Link>

              <Link
                href={"/patient-admin/patient-tests"}
                className="text-white bg-green-500 rounded-lg px-3 py-[5px]"
              >
                My Tests
              </Link>
            </>
          )}

          {type === "doctor" && (
            <div className="">
              <LogoutButton className="text-white bg-green-500 rounded-lg px-3 flex items-center gap-2 py-[5px]">
                <ExitIcon className="h-4 w-4" />
                Logout
              </LogoutButton>

              <div className="mt-5 flex items-center justify-between">
                <Switch
                  checked={checked}
                  disabled={loading}
                  onCheckedChange={handleToggle}
                />
                <span
                  className={cn(
                    `px-4 py-2 rounded-lg`,
                    checked ? "bg-emerald-700/70" : "bg-red-800/70"
                  )}
                >
                  {checked ? "Doc Available" : "Not Available"}
                </span>
              </div>
            </div>
          )}

          {type === "admin" && (
            <>
              <LogoutButton className="text-white bg-green-500 rounded-lg px-3 flex items-center gap-2 py-[5px]">
                <ExitIcon className="h-4 w-4" />
                Logout
              </LogoutButton>
              <Link
                href={`/register-doc`}
                className="text-white bg-green-500 rounded-lg px-3 py-[5px]"
              >
                Register Doc
              </Link>
            </>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
