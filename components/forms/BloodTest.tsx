"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { BloodGroups, FormFieldType } from "@/constants";
import { BloodTestSchema } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

import CustomForm from "../patient-manager-component/CustomForm";

import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { SubmitButton } from "../patient-manager-component/SubmitButton";
import { SelectItem } from "../ui/select";
import { Doctor } from "@/next-auth";
import { registerBloodTest } from "@/actions/doctor.actions";
import { toast } from "sonner";

interface BloodTestFormProps {
  TheCurrentDoc: Doctor;
  ThePatientForTest: [
    {
      patient: {
        id: string;
        name: string;
        image?: string | null;
      };
    }
  ];
}

const BloodTestForm = ({
  TheCurrentDoc,
  ThePatientForTest,
}: BloodTestFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof BloodTestSchema>>({
    resolver: zodResolver(BloodTestSchema),
    defaultValues: {
      patientName: "",
      patientId: "",
      testDate: new Date(),
      hemoglobin: 0,
      wbcCount: 0,
      rbcCount: 0,
      platelets: 0,
      hematocrit: 0,
      mcv: 0,
      mch: 0,
      mchc: 0,
      rdw: 0,
      neutrophils: 0,
      lymphocytes: 0,
      monocytes: 0,
      eosinophils: 0,
      basophils: 0,
      esr: 0,
      bloodGroup: "A+",

      age: 0,
      patientWeight: 0,
      doctorId: TheCurrentDoc.id,
      comments: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof BloodTestSchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const NewTest = {
        id: "",
        patientName: values.patientName,
        patientId: values.patientId,
        testDate: values.testDate,
        hemoglobin: values.hemoglobin,
        wbcCount: values.wbcCount,
        rbcCount: values.rbcCount,
        platelets: values.platelets,
        hematocrit: values.hematocrit,
        mcv: values.mcv,
        mch: values.mch,
        mchc: values.mchc,
        rdw: values.rdw,
        neutrophils: values.neutrophils,
        lymphocytes: values.lymphocytes,
        monocytes: values.monocytes,
        eosinophils: values.eosinophils,
        basophils: values.basophils,
        esr: values.esr,
        bloodGroup: values.bloodGroup,
        bloodSugar: values.bloodSugar,

        age: values.age,
        patientWeight: values.patientWeight,
        doctorId: values.doctorId,
        comments: values.comments,
      };

      const newTest = await registerBloodTest(NewTest);

      if (newTest.success) {
        toast("The Blood Test Has Been Registered", {
          description: "Plz notify the patient about the test results.",
          style: { backgroundColor: "#10b981", color: "#fff" },
        });

        form.reset();
        setIsLoading(false);
      }

      if (newTest.error) {
        toast("Something went wrong", {
          description: "Please try again later.",
          className: "bg-red-500",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <section className="p-[5%] !w-full">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-12 flex-1"
        >
          <h1 className="header">Blood Test Form</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
                <CustomForm
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="patientName"
                  label="Patient Name"
                  placeholder="John Doe"
                />

                <CustomForm
                  fieldType={FormFieldType.DATE_PICKER}
                  control={form.control}
                  name="testDate"
                  label="Test Date"
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="hemoglobin"
                  label="Hemoglobin (g/dL)"
                  placeholder="e.g. 13.5"
                />

                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="rbcCount"
                  label="RBC Count (million/μL)"
                  placeholder="e.g. 4.7"
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="wbcCount"
                  label="WBC Count (thousand/μL)"
                  placeholder="e.g. 7.0"
                />

                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="platelets"
                  label="Platelet Count (thousand/μL)"
                  placeholder="e.g. 250"
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="bloodGroup"
                  label="Blood Group"
                  placeholder="Select a Blood Group"
                >
                  {BloodGroups.map((bloodGroup) => (
                    <SelectItem key={bloodGroup.id} value={bloodGroup.name}>
                      <div className="cursor-pointer">
                        <p>{bloodGroup.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomForm>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="age"
                  label="Patient Age"
                  placeholder="e.g. 25"
                />

                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="patientWeight"
                  label="Patient Weight (kgs)"
                  placeholder="e.g. 72kg"
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="notes"
                  label="Notes (optional)"
                  placeholder="Any observations or special instructions"
                />
              </div>

              <div className="flex flex-col gap-3">
                <CustomForm
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="doctorId"
                  label="Current Doctor"
                  placeholder="Select a Doctor"
                >
                  <SelectItem key={TheCurrentDoc.id} value={TheCurrentDoc.id}>
                    <div className="flex cursor-pointer items-center gap-2">
                      <Image
                        src={TheCurrentDoc.image! || "/assets/default-pic.jpg"}
                        width={32}
                        height={32}
                        alt={TheCurrentDoc.name}
                        className="rounded-full h-8 w-8 border border-dark-500"
                      />
                      <p>{TheCurrentDoc.name}</p>
                    </div>
                  </SelectItem>
                </CustomForm>

                <CustomForm
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="patientId"
                  label="Current Patient"
                  placeholder="Select a Patient"
                >
                  {ThePatientForTest.map((patient) => (
                    <SelectItem
                      key={patient.patient.id}
                      value={patient.patient.id}
                    >
                      <div className="flex cursor-pointer items-center gap-2">
                        <Image
                          src={
                            patient.patient.image || "/assets/default-pic.jpg"
                          }
                          width={32}
                          height={32}
                          alt={patient.patient.name}
                          className="rounded-full h-8 w-8 border border-dark-500"
                        />
                        <p>{patient.patient.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </CustomForm>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <h1 className="header mt-6 mb-6">more info</h1>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="hematocrit"
                  label="Hematocrit (%)"
                />
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="mcv"
                  label="MCV (fL)"
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="mch"
                  label="MCH (pg)"
                />
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="mchc"
                  label="MCHC (g/dL)"
                />
              </div>
              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="rdw"
                  label="RDW (%)"
                />
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="neutrophils"
                  label="Neutrophils (%)"
                />

                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="lymphocytes"
                  label="Lymphocytes (%)"
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="monocytes"
                  label="Monocytes (%)"
                />
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="eosinophils"
                  label="Eosinophils (%)"
                />
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="basophils"
                  label="Basophils (%)"
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="esr"
                  label="Erythrocyte Sedimentation Rate (mm/hr)"
                />
                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="bloodSugar"
                  label="Blood Sugar (mg/dL)"
                />
              </div>
            </div>
          </div>
          <SubmitButton isLoading={isLoading}>Register Blood Test</SubmitButton>
        </form>
      </section>
    </Form>
  );
};

export default BloodTestForm;
