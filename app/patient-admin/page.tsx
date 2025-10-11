import { getAppointmentsForUser } from "@/actions/appointment.actions";

import StatCard from "@/components/patient-manager-component/StatCard";
import { currentUser } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { MdCancel, MdOutlinePendingActions } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { DataTable } from "@/components/Patient-Admin-table/DataTable";
import { columns } from "@/components/Patient-Admin-table/columns";
import { UserButton } from "@/components/auth/user-button";

const AdminPage = async () => {
  const loggedIn = await currentUser();
  const appointmentData = await getAppointmentsForUser({ id: loggedIn?.id });

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo.svg"
            width={32}
            height={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <UserButton loggedInUserId={loggedIn?.id!} type="patient" />
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome👋</h1>
          <p className="text-dark-700">
            This is Your Appointment Dashboard, Manage Your Appointments with a
            click of a button
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointmentData.scheduledCount}
            label="Scheduled Appointments"
            icon={<RiCalendarScheduleFill />}
          />

          <StatCard
            type="pending"
            count={appointmentData.pendingCount}
            label="Pending Appointments"
            icon={<MdOutlinePendingActions />}
          />

          <StatCard
            type="cancelled"
            count={appointmentData.cancelledCount}
            label="Cancelled Appointments"
            icon={<MdCancel />}
          />
        </section>

        <DataTable columns={columns} data={appointmentData.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
