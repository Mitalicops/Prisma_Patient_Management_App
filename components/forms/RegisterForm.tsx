"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import {
  FormFieldType,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
  Specializations,
} from "@/constants";
import { PatientFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

import CustomForm from "../patient-manager-component/CustomForm";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { RiLockPasswordFill } from "react-icons/ri";
import { registerPatient } from "@/actions/patient.actions";
import { SubmitButton } from "../patient-manager-component/SubmitButton";
import { Doctor } from "@/next-auth";
import { UserRole } from "@prisma/client";

type doctors = {
  name: string;
  email: string;
  id: string;
  image: string | null;
  specialization: string | null;
}[];

const RegisterForm = ({ Doctors }: { Doctors: doctors }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [imageUrl, setImageUrl] = useState<any>();

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
    },
  });

  useEffect(() => {
    if (imageUrl?.secure_url) {
      form.setValue("identificationDocumentUrl", imageUrl?.secure_url);
    }
  }, [imageUrl, form]);

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Store file info in form data as
    //let formData;
    //if (
    //values.identificationDocument &&
    //values.identificationDocument?.length > 0
    //) {
    //const blobFile = new Blob([values.identificationDocument[0]], {
    //type: values.identificationDocument[0].type,
    //});

    //formData = new FormData();
    //formData.append("blobFile", blobFile);
    //formData.append("fileName", values.identificationDocument[0].name);
    //}

    // Store file info in form data as

    try {
      const patient = {
        id: "",
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryPhysician: values.primaryPhysician,
        insuranceProvider: values.insuranceProvider,
        insurancePolicyNumber: values.insurancePolicyNumber,
        allergies: values.allergies,
        currentMedication: values.currentMedication,
        familyMedicalHistory: values.familyMedicalHistory,
        pastMedicalHistory: values.pastMedicalHistory,
        identificationType: values.identificationType,
        identificationNumber: values.identificationNumber,
        identificationDocumentUrl: values.identificationDocumentUrl,
        treatmentConsent: values.treatmentConsent,
        disclosureConsent: values.disclosureConsent,
        privacyConsent: values.privacyConsent,
        role: UserRole.Patient,
      };

      const newPatient = await registerPatient(patient);

      if (newPatient) {
        setSuccess("Patient registered successfully");
        form.reset();
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">welcome 👋</h1>
          <p className="text-dark-700">Let us know about You</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>

          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            iconSrc={<FaRegUserCircle />}
            iconAlt="user"
          />

          <CustomForm
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="Password"
            placeholder="********"
            iconSrc={<RiLockPasswordFill />}
            iconAlt="password"
          />

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
              placeholder="johndoe@jsmastery.pro"
              iconSrc={<MdOutlineAlternateEmail />}
              iconAlt="email"
            />

            <CustomForm
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="(123) 456-7890"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="birthDate"
              label="Date of Birth"
              placeholder="johndoe@jsmastery.pro"
            />
            <CustomForm
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="address"
              label="Address"
              placeholder="14 Street, New York"
            />
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="occupation"
              label="Occupation"
              placeholder="Software Engineer"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="emergencyContactName"
              label="Emergency contact name"
              placeholder="Guardian's Name"
            />

            <CustomForm
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="emergencyContactNumber"
              label="Emergency contact number"
              placeholder="(123) 456-7890"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>

          <CustomForm
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a Primary Physician"
          >
            {Specializations.map((specialization) => {
              const doctorsInSpecialization = Doctors?.filter(
                (doctor) => doctor.specialization === specialization.name
              );

              if (!doctorsInSpecialization?.length) return null;

              return (
                <SelectGroup key={specialization.name}>
                  <SelectLabel>{specialization.name}</SelectLabel>
                  {doctorsInSpecialization.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      <div className="flex cursor-pointer items-center gap-2">
                        <Image
                          src={doctor.image!}
                          width={32}
                          height={32}
                          alt={doctor.name}
                          className="rounded-full h-8 w-8 border border-dark-500"
                        />
                        <p>{doctor.name}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              );
            })}
          </CustomForm>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="BlueCross BlueShield"
            />
            <CustomForm
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="insurancePolicyNumber"
              label="Insurance Policy Number"
              placeholder="ABC123456789"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="allergies"
              label="Allergies (if any)"
              placeholder="ex: Peanuts, Penicillin, Pollen"
            />
            <CustomForm
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="currentMedication"
              label="Current Medication (if any)"
              placeholder="ex: Ibuprofen 200mg, Paracetamol 500mg"
            />
          </div>

          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomForm
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="familyMedicalHistory"
              label="Family Medical History"
              placeholder="ex: Mother Had Diabetes, Father Had Hypertension"
            />
            <CustomForm
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="pastMedicalHistory"
              label="Past Medical History (if any)"
              placeholder="ex: Heart Disease, Asthma"
            />
          </div>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>

          <CustomForm
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select a Identification Type"
          >
            {IdentificationTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </CustomForm>

          <CustomForm
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="identificationNumber"
            label="Identification Number"
            placeholder="1234567890"
          />

          <CustomForm
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="identificationDocumentUrl"
            label="Scanned Copy of Identification Document"
            renderSkeleton={(field) => (
              <FormControl>
                <CldUploadWidget
                  uploadPreset="Hospital_Managment_App_Prisma"
                  onSuccess={(result, { widget }) => {
                    setImageUrl(result.info);
                    widget.close();
                  }}
                >
                  {({ open }) => {
                    return (
                      <div className="file-upload" onClick={() => open()}>
                        <>
                          <Image
                            src="/assets/icons/upload.svg"
                            width={40}
                            height={40}
                            alt="upload"
                          />
                          <div className="file-upload_label">
                            <p className="text-14-regular ">
                              <span className="text-green-500">
                                Click to upload{" "}
                              </span>
                              or drag and drop
                            </p>
                            <p className="text-12-regular">
                              SVG, PNG, JPG or GIF (max. 800x400px)
                            </p>
                          </div>
                        </>
                      </div>
                    );
                  }}
                </CldUploadWidget>
              </FormControl>
            )}
          />
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>

          <CustomForm
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to receive treatment for my health condition."
          />

          <CustomForm
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to disclosure of information"
          />

          <CustomForm
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I consent to privacy policy"
          />
        </section>
        <FormError message={error} />
        <FormSuccess message={success} />
        <SubmitButton isLoading={isLoading}>Create Account</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
