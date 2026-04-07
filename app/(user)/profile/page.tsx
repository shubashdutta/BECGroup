"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import NavTabs from "@/src/Common/NavTabs";
import PersonalInformation from "@/src/Common/studentInfo/PersonalInformation";
import StudentAcademic from "@/src/Common/studentInfo/studentAcademicDetails/StudentAcademic";
import WorkExperience from "@/src/Common/studentInfo/workExperience/WorkExperience";
import Test from "@/src/Common/studentInfo/Test/Test";
import { PublicStudentForm } from "@/src/ApiList/PublicApi";
import {
  errorMessage,
  successMessage,
} from "@/src/lib/ToastifyMessage/ToastifyMessage";

export type AcademicDetail = {
  countryOfEducation: string;
  stateOfStudy: string;
  levelOfStudy: string;
  universityName: string;
  qualificationAchieved: string;
  cityOfStudy: string;
  gradingSystem: string;
  score: string;
  primaryLanguage: string;
  startDate: string;
  endDate: string;
  academicType: string;
};

export type MainFormValues = {
  personalDetail: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    email?: string;
    mobile?: string;
    dob?: string;
    maritalStatus?: any;
  };
  academicDetails: AcademicDetail[];
  workExperience: {};
  testDetails: any[];
};

const Page = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MainFormValues>({
    defaultValues: {
      personalDetail: {},
      academicDetails: [{}],
      workExperience: {},
      testDetails: [{}],
    },
  } as any);

  const [uploadedFiles, setUploadedFiles] = useState<{
    [key: string]: File[];
  }>({});

  const onSubmit = async (data: MainFormValues) => {
    const payload = {
      ...data,

      personalDetail: {
        ...data.personalDetail,
        maritalStatus: data.personalDetail?.maritalStatus?.value || "",
      },

      academicDetails: data.academicDetails.map((item: any) => ({
        ...item,
        academicType: item.academicType?.value || "POST_GRADUATE",
      })),

      testDetails: data.testDetails.map((item: any) => ({
        ...item,
        testType: item.testType?.value || "GRE",
      })),
    };

    const formData: any = new FormData();
    formData.append("student", JSON.stringify(payload));

    const fileFieldMap = {
      Passport: "passport",
      Grade10: "tenMarksheet",
      Grade12: "twelveMarksheet",
      Undergraduate: "underGraduate",
      Postgraduate: "postGraduate",
      test: "test",
      resume: "resume",
    } as const;

    Object.entries(fileFieldMap).forEach(([stateKey, formKey]) => {
      const files = uploadedFiles?.[stateKey as keyof typeof uploadedFiles];

      if (files?.length) {
        files.forEach((item: any) => {
          formData.append(formKey, item.file);
        });
      } else {
        formData.append(formKey, null);
      }
    });

    try {
      const res: any = await PublicStudentForm(formData);
      successMessage({ message: res?.message });
    } catch (error) {
      errorMessage({ error });
    }
  };

  const tabs = [
    {
      id: "personal",
      label: "Personal Information",
      status: "Incomplete",
      statusColor: "text-red-500",
      content: (
        <PersonalInformation
          register={register}
          setValue={setValue}
          watch={watch}
          control={control}
          errors={errors}
          parentHandleSubmit={handleSubmit}
          parentOnSubmit={onSubmit}
          setUploadedFile={setUploadedFiles}
        />
      ),
    },
    {
      id: "academic",
      label: "Academic Qualification",
      status: "Incomplete",
      statusColor: "text-red-500",
      content: (
        <StudentAcademic
          register={register as any}
          setValue={setValue as any}
          watch={watch}
          control={control as any}
          errors={errors}
        />
      ),
    },
    {
      id: "work",
      label: "Work Experience",
      status: "Optional",
      statusColor: "text-red-500",
      content: <WorkExperience register={register} errors={errors} />,
    },
    {
      id: "tests",
      label: "Tests",
      status: "Incomplete",
      statusColor: "text-red-500",
      content: (
        <Test
          register={register as any}
          setValue={setValue as any}
          watch={watch}
          control={control as any}
          errors={errors}
        />
      ),
    },
  ];

  return <NavTabs tabs={tabs} defaultActiveTab="personal" />;
};

export default Page;
