import { getAllDoctors } from "@/actions/doctor.actions";
import RegisterForm from "@/components/forms/RegisterForm";
import PasskeyModal from "@/components/patient-manager-component/PasskeyModal";
import { Button } from "@/components/ui/button";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const RegisterPage = async () => {
  const doctors = await getAllDoctors();
  //const isAdmin = searchParams.admin === "true";
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/icons/logo.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="mb-12 h-10 w-fit"
          />

          <RegisterForm Doctors={doctors} />

          <div className="text-14-regular mt-20 items-center flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse
            </p>

            <Link
              href="/patient-admin"
              className="text-white bg-green-500 rounded-lg px-6 py-[5px]"
            >
              Admin
            </Link>

            <Link
              className="text-white bg-green-500 rounded-lg px-6 py-[5px]"
              href={`/auth/login`}
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default RegisterPage;
