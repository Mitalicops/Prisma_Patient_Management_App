import { getUser } from "@/actions/patient.actions";
import { LoginForm } from "@/components/forms/LoginForm";
import PasskeyModal from "@/components/patient-manager-component/PasskeyModal";
import { currentRole } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";

const LoginPage = async () => {
  //const user = await getUser(userId);

  const userRole = await currentRole()

  
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

          <LoginForm />

          <div className="text-14-regular mt-20 flex items-center justify-between ">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © 2024 CarePulse
            </p>

            <Link
              href={`/patient-admin`}
              className="text-white bg-green-500 rounded-lg px-6 py-[5px]"
            >
              Admin
            </Link>

            <Link
              className="text-white bg-green-500 rounded-lg px-6 py-[5px]"
              href={`/auth/register`}
            >
              Register
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

export default LoginPage;
