import MedTestsCard from "@/components/MedTestsCard";
import React from "react";
import { MdBloodtype } from "react-icons/md";

const MedicalTests = () => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 p-4 w-full h-full">
      <MedTestsCard
        icon={<MdBloodtype className="text-red-800" size={40} />}
        title="Blood Test"
        href="/MedicalTests/bloodtest"
      />

      <MedTestsCard
        icon={<MdBloodtype className="text-red-800" size={40} />}
        title="X-Ray"
        description="Coming soon"
        href="/bloodtest"
      />

      <MedTestsCard
        icon={<MdBloodtype className="text-red-800" size={40} />}
        title="MRI Scan"
        description="Coming soon"

      />
      <MedTestsCard
        icon={<MdBloodtype className="text-red-800" size={40} />}
        title="CT Scan"
        description="Coming soon"
      />
      <MedTestsCard
        icon={<MdBloodtype className="text-red-800" size={40} />}
        title="Ultrasound"
        description="Coming soon"
      
      />
      <MedTestsCard
        icon={<MdBloodtype className="text-red-800" size={40} />}
        title="ECG"
        description="Coming soon"

      />
    </div>
  );
};

export default MedicalTests;
