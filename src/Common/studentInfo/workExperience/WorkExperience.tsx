// "use client";

// import React, { FC } from "react";
// import TextInput from "../../TextInput";
// import { FORM_TYPE } from "@/src/utils/InputType";
// import { UseFormRegister, FieldErrors } from "react-hook-form";
// import { MainFormValues } from "@/app/(user)/profile/page";

// interface WorkExperienceFormProps {
//   register: UseFormRegister<MainFormValues>;
//   errors: FieldErrors<MainFormValues>;
// }

// const WorkExperienceForm: FC<WorkExperienceFormProps> = ({
//   register,
//   errors,
// }) => {
//   return (
//     <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 md:p-8">
//       <h2 className="text-xl font-semibold text-blue-600 mb-6">
//         Work Experience
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Organisation */}
//         <TextInput
//           label="Name of the Organisation & Address"
//           register={register}
//           name="workExperience.organisation"
//           type={FORM_TYPE.TEXT}
//           errors={errors}
//         />

//         {/* Position */}
//         <TextInput
//           label="Position"
//           register={register}
//           name="workExperience.position"
//           type={FORM_TYPE.TEXT}
//           errors={errors}
//         />

//         {/* Job Profile */}
//         <TextInput
//           label="Job Profile"
//           register={register}
//           name="workExperience.jobProfile"
//           type={FORM_TYPE.TEXT}
//           errors={errors}
//         />

//         {/* Salary Mode */}
//         <TextInput
//           label="Salary Mode"
//           register={register}
//           name="workExperience.salaryMode"
//           type={FORM_TYPE.TEXT}
//           errors={errors}
//         />

//         {/* Working From */}
//         <TextInput
//           label="Working From"
//           register={register}
//           name="workExperience.workingFrom"
//           type={FORM_TYPE.DATE}
//           errors={errors}
//         />

//         {/* Working Upto */}
//         <TextInput
//           label="Working Upto"
//           register={register}
//           name="workExperience.workingUpto"
//           type={FORM_TYPE.DATE}
//           errors={errors}
//         />

//         <div className=" col-span-2 mt-4">
//           <TextInput
//             label="Currently Working Here"
//             errors={errors}
//             name="workExperience.currentlyWorking"
//             register={register}
//             type={FORM_TYPE.CHECKBOX}
//           />
//         </div>

//         {/* Currently Working Checkbox */}
//         <div className="flex items-center md:col-span-2 mt-2">
//           {/* <input
//             type="checkbox"
//             {...register("workExperience.currentlyWorking")}
//             className="mr-2"
//           /> */}

//           {/* <label>Currently Working Here</label> */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WorkExperienceForm;

"use client";

import React, { FC } from "react";
import TextInput from "../../TextInput";
import { FORM_TYPE } from "@/src/utils/InputType";
import { UseFormRegister, FieldErrors } from "react-hook-form";
import { MainFormValues } from "@/app/(user)/profile/page";

interface WorkExperienceFormProps {
  register: UseFormRegister<MainFormValues>;
  errors: FieldErrors<MainFormValues>;
}

const WorkExperienceForm: FC<WorkExperienceFormProps> = ({
  register,
  errors,
}) => {
  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-semibold text-blue-600 mb-6">
        Work Experience
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Organization */}
        <TextInput
          label="Name of the Organisation & Address"
          register={register}
          name="workExperience.organizationName"
          type={FORM_TYPE.TEXT}
          errors={errors}
        />

        {/* Position */}
        <TextInput
          label="Position"
          register={register}
          name="workExperience.position"
          type={FORM_TYPE.TEXT}
          errors={errors}
        />

        {/* Job Profile */}
        <TextInput
          label="Job Profile"
          register={register}
          name="workExperience.jobProfile"
          type={FORM_TYPE.TEXT}
          errors={errors}
        />

        {/* Mode of Salary */}
        <TextInput
          label="Mode of Salary"
          register={register}
          name="workExperience.modeOfSalary"
          type={FORM_TYPE.TEXT}
          errors={errors}
        />

        {/* Working From */}
        <TextInput
          label="Working From"
          register={register}
          name="workExperience.workingFrom"
          type={FORM_TYPE.DATE}
          errors={errors}
        />

        {/* Working Upto */}
        <TextInput
          label="Working Upto"
          register={register}
          name="workExperience.workingUpto"
          type={FORM_TYPE.DATE}
          errors={errors}
        />

        {/* Currently Working Checkbox */}
        <div className="col-span-2 mt-4">
          <TextInput
            label="Currently Working Here"
            register={register}
            name="workExperience.isCurrentlyWorking"
            type={FORM_TYPE.CHECKBOX}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkExperienceForm;
