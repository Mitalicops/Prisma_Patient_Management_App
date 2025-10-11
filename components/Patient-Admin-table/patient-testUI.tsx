"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { analyzeBloodTestReport } from "@/actions/ai-feedback";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BloodtestProps {
  data: any[];
}

const PatientTestUi = ({ data }: BloodtestProps) => {
  const [IsOpenModal, setModal] = useState(false);
  const router = useRouter();
  const [TheId, setTestId] = useState("");

  const [disabled, setDisabled] = useState(false);

  //console.log("Test ID:", TheId);

  const onSubmit = async (testId: string) => {
    setDisabled(true);
    try {
      //const theData = data.find((test) => test.id === testId);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({ bloodTestId: testId }), //JSON.stringify({ bloodTest: theData }),  //the both commented lines caused errors as the data going was of the previous id
      });

      const generatedFeedback = await res.json();

      if (res.status === 200) {
        toast("The AI Feedback is generated", {
          style: { backgroundColor: "#10b981", color: "#fff" },
          action: {
            label: "See Report",
            onClick: () =>
              router.push(`/patient-admin/patient-tests/${testId}/ai-feedback`),
          },
        });
      } else {
        toast("Something went wrong", {
          className: "bg-red-500",
        });
      }

      setDisabled(false);
    } catch (error) {
      console.log(error);
      toast("Something went wrong", {
        description: "Error generating feedback.",
        className: "bg-red-500",
      });
      setDisabled(false);
    }
  };

  return (
    <>
      {data?.map((test) => (
        <div
          key={test.id}
          className="bg-green-300 p-2 rounded-xl w-full shadow-md h-fit"
        >
          <div className="bg-blue-950 p-4 rounded-lg shadow-md w-full flex flex-col">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-green-300 font-medium text-[18px]">
                Test Date:
              </span>{" "}
              <span className="text-lg font-semibold">
                {new Date(test.testDate).toDateString()}
              </span>
            </div>
            <div className="flex gap-4 items-center mb-2 mt-2">
              <h1 className="text-green-300 font-medium text-[20px]">
                Doctor:{" "}
              </h1>
              <span className="flex items-center gap-1.5">
                <Image
                  src={test.doctor.image || "/assets/default-pic.jpg"}
                  width={100}
                  height={100}
                  alt={test.doctor.name}
                  className="rounded-full h-8 w-8"
                />
                <p className="text-[18px] font-semibold">
                  Dr. {test.doctor.name}
                </p>
              </span>
            </div>{" "}
            <div className="flex items-center gap-4">
              <h1 className="text-green-300 font-medium text-[18px]">
                Comments:
              </h1>

              <p className="text-[18px] font-semibold">
                {test.comments || "No comments"}
              </p>
            </div>
            <div className="inline-flex mt-4 text-black font-medium gap-3 max-[420px]:flex-col">
              <Button
                className="bg-green-300 py-2 px-6 rounded-xl"
                onClick={() => {
                  setModal(!IsOpenModal);
                  setTestId(test.id);
                }}
              >
                View Test
              </Button>

              {test.feedbackLocked ? (
                <Button asChild className="bg-white py-2 px-6 rounded-xl">
                  <Link
                    href={`/patient-admin/patient-tests/${test.id}/ai-feedback`}
                  >
                    View Feedback
                  </Link>
                </Button>
              ) : (
                <Button
                  className="bg-teal-300 py-2 px-6 rounded-xl"
                  disabled={disabled || test.feedbackLocked}
                  onClick={() => onSubmit(test.id)}
                >
                  Generate AI Feedback
                </Button>
              )}
            </div>
          </div>

          {IsOpenModal && test.id === TheId && (
            <div className="absolute inset-0 h-fit w-full bg-black bg-opacity-30  flex items-center justify-center z-10">
              <div className="bg-green-300 p-1.5 rounded-xl shadow-lg">
                <div className="bg-cyan-950 p-6 gap-2 rounded-lg shadow-lg">
                  <h2 className="text-xl font-semibold mb-4">Test Details:</h2>

                  <div className="grid grid-cols-2 max-[745px]:grid-cols-1 gap-4">
                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Hemoglobin:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.hemoglobin} (g/dL)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Hematrocit:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.hematocrit} (%)
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        White Blood Cells:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.wbcCount} (thousand/μL)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Red Blood Cells:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.rbcCount} (million/μL)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Platelets:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.platelets} (thousand/μL)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        MCV:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.mcv} (fL)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        MCH:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.mch} (pg)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        MCHC:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.mchc} (g/dL)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        RDW:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.rdw} (%)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Neutrophils:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.neutrophils} (%)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Lymphocytes:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.lymphocytes} (%)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Monocytes:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.monocytes} (%)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Eosinophils:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.eosinophils} (%)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        basophils:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.basophils} (%)
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Patient Weight:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.patientWeight}/Kgs
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Patient Age:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.age}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <h1 className="text-white font-medium text-[18px] max-[726px]:text-[16px]">
                        Blood Group:
                      </h1>

                      <p className="text-[18px] text-stone-400 font-semibold">
                        {test.bloodGroup}
                      </p>
                    </div>
                  </div>
                  <Button
                    className="mt-4 py-2 px-4 rounded-full bg-black"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default PatientTestUi;
