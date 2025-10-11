import { getBloodTestData } from "@/actions/bloodtest";
import PatientTestUi from "@/components/Patient-Admin-table/patient-testUI";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const PatientTests = async () => {
  const testData = await getBloodTestData();

  return (
    <section className="p-[5%] grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] max-[450px]:grid-cols-[repeat(auto-fit,minmax(290px,1fr))] h-full gap-4 relative">
      <PatientTestUi data={testData || []} />
    </section>
  );
};

export default PatientTests;
