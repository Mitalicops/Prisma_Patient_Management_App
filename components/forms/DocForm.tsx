"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { CldUploadWidget } from "next-cloudinary";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormFieldType, GenderOptions, RoleOptions } from "@/constants";
import { DoctorSchema } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

import CustomForm from "../patient-manager-component/CustomForm";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";

import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

import { RiLockPasswordFill } from "react-icons/ri";
import { registerDoctor } from "@/actions/patient.actions";
import { SubmitButton } from "../patient-manager-component/SubmitButton";

const RegisterDocForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [imageUrl, setImageUrl] = useState<any>();

  const form = useForm<z.infer<typeof DoctorSchema>>({
    resolver: zodResolver(DoctorSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      gender: "Male",
      education: "",
      yearsOfExperience: 0,
      birthDate: new Date(),
      specialization: "",
      hospitalAffiliation: "",
      image: "",
      licenseNumber: "",
      role: "Doctor",
    },
  });

  useEffect(() => {
    if (imageUrl?.secure_url) {
      form.setValue("image", imageUrl?.secure_url);
    }
  }, [imageUrl, form]);

  const onSubmit = async (values: z.infer<typeof DoctorSchema>) => {
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const Doctor = {
        id: "",
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        birthDate: new Date(values.birthDate),
        gender: values.gender,
        address: values.address,
        specialization: values.specialization,
        licenseNumber: values.licenseNumber,
        yearsOfExperience: values.yearsOfExperience,
        education: values.education,
        hospitalAffiliation: values.hospitalAffiliation,
        isAvailable: values.isDocAvailable,
        image: values.image,
        role: values.role,
      };

      const newDoc = await registerDoctor(Doctor);

      if (newDoc) {
        if (newDoc.error) {
          setError(newDoc.error);
        } else {
          setSuccess("Doctor registered successfully");
        }

        console.log("THE DOCCCCCCCCCC", { newDoc });

        form.reset();
        setIsLoading(false);
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
          <h1 className="header">Register Doctor</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            <div className="space-y-2">
              <div className="flex flex-col gap-2">
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
              </div>

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
            </div>

            <div className="space-y-2">
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
                  name="specialization"
                  label="Specialization"
                  placeholder="Cardiologist..."
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="licenseNumber"
                  label="license Number"
                  placeholder="123456789"
                />

                <CustomForm
                  fieldType={FormFieldType.NUMBER}
                  control={form.control}
                  name="yearsOfExperience"
                  label="Year's Of Experience"
                />
              </div>

              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomForm
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="education"
                  label="Education"
                />

                <CustomForm
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="hospitalAffiliation"
                  label="Hospital Affiliation"
                  placeholder="City General Hospital"
                />
              </div>

              <div>
                <CustomForm
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="role"
                  label="Role"
                  renderSkeleton={(field) => (
                    <FormControl>
                      <RadioGroup
                        className="flex h-11 gap-6 xl:justify-between"
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {RoleOptions.map((option) => (
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
            </div>
          </div>

          <CustomForm
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="image"
            label="Doctor Photo"
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

          <FormError message={error} />
          <FormSuccess message={success} />
          <SubmitButton isLoading={isLoading}>Create Doctor</SubmitButton>
        </form>
      </section>
    </Form>
  );
};

export default RegisterDocForm;
