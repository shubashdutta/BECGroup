// import { Controller, Control, UseFormWatch } from "react-hook-form";

// interface BackgroundInfoProps {
//   control: Control<any>;
//   watch: UseFormWatch<any>;
// }

// interface YesNoProps {
//   control: Control<any>;
//   name: string;
// }

// const YesNo: React.FC<YesNoProps> = ({ control, name }) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <div className="flex items-center gap-8">
//           {/* NO */}
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               checked={field.value === false}
//               onChange={() => field.onChange(false)}
//               className="w-4 h-4 accent-green-500"
//             />
//             <span className="text-sm text-gray-800">No</span>
//           </label>

//           {/* YES */}
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="radio"
//               checked={field.value === true}
//               onChange={() => field.onChange(true)}
//               className="w-4 h-4 accent-gray-400"
//             />
//             <span className="text-sm text-gray-800">Yes</span>
//           </label>
//         </div>
//       )}
//     />
//   );
// };

// const BackgroundInfo: React.FC<BackgroundInfoProps> = ({ control, watch }) => {
//   const base = "personalDetail.backgroundInfo";

//   const hasImmigrationHistory = watch(
//     `${base}.hasImmigrationHistory`
//   ) as boolean;

//   const hasMedicalIssue = watch(`${base}.hasMedicalIssue`) as boolean;

//   const hasVisaRefusal = watch(`${base}.hasVisaRefusal`) as boolean;

//   const hasCriminalRecord = watch(`${base}.hasCriminalRecord`) as boolean;

//   return (
//     <div className="space-y-10 py-3 border-b border-gray-200">
//       {/* Immigration */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//         <div className="space-y-3">
//           <p className="text-sm font-medium text-gray-800">
//             Has applicant applied for any type of immigration into any country?
//           </p>
//           <YesNo control={control} name={`${base}.hasImmigrationHistory`} />
//         </div>

//         <Controller
//           control={control}
//           name={`${base}.immigrationCountry`}
//           render={({ field }) => (
//             <select
//               {...field}
//               disabled={!hasImmigrationHistory}
//               className="w-full rounded-lg bg-gray-100 border border-gray-200
//                          px-4 py-3 text-sm text-gray-600
//                          disabled:cursor-not-allowed"
//             >
//               <option value="">Select Country</option>
//               <option value="Australia">Australia</option>
//               <option value="Canada">Canada</option>
//               <option value="USA">USA</option>
//             </select>
//           )}
//         />
//       </div>

//       {/* Medical */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//         <div className="space-y-3">
//           <p className="text-sm font-medium text-gray-800">
//             Does applicant suffer from a serious medical condition?
//           </p>
//           <YesNo control={control} name={`${base}.hasMedicalIssue`} />
//         </div>

//         <Controller
//           control={control}
//           name={`${base}.medicalIssue`}
//           render={({ field }) => (
//             <input
//               {...field}
//               disabled={!hasMedicalIssue}
//               placeholder="Specify Here..."
//               className="w-full rounded-lg bg-gray-100 border border-gray-200
//                          px-4 py-3 text-sm
//                          disabled:cursor-not-allowed"
//             />
//           )}
//         />
//       </div>

//       {/* Visa Refusal */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//         <div className="space-y-3">
//           <p className="text-sm font-medium text-gray-800">
//             Has applicant Visa refusal for any country?
//           </p>
//           <YesNo control={control} name={`${base}.hasVisaRefusal`} />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <Controller
//             control={control}
//             name={`${base}.visaRefusalCountry`}
//             render={({ field }) => (
//               <select
//                 {...field}
//                 disabled={!hasVisaRefusal}
//                 className="w-full rounded-lg bg-gray-100 border border-gray-200
//                            px-4 py-3 text-sm
//                            disabled:cursor-not-allowed"
//               >
//                 <option value="">Select Country</option>
//                 <option value="UK">UK</option>
//                 <option value="USA">USA</option>
//               </select>
//             )}
//           />

//           <Controller
//             control={control}
//             name={`${base}.visaName`}
//             render={({ field }) => (
//               <input
//                 {...field}
//                 disabled={!hasVisaRefusal}
//                 placeholder="Type of Visa"
//                 className="w-full rounded-lg bg-gray-100 border border-gray-200
//                            px-4 py-3 text-sm
//                            disabled:cursor-not-allowed"
//               />
//             )}
//           />
//         </div>
//       </div>

//       {/* Criminal */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
//         <div className="space-y-3">
//           <p className="text-sm font-medium text-gray-800">
//             Has applicant ever been convicted of a criminal offence?
//           </p>
//           <YesNo control={control} name={`${base}.hasCriminalRecord`} />
//         </div>

//         <Controller
//           control={control}
//           name={`${base}.crimeDetails`}
//           render={({ field }) => (
//             <input
//               {...field}
//               disabled={!hasCriminalRecord}
//               placeholder="Specify Here..."
//               className="w-full rounded-lg bg-gray-100 border border-gray-200
//                          px-4 py-3 text-sm
//                          disabled:cursor-not-allowed"
//             />
//           )}
//         />
//       </div>
//     </div>
//   );
// };

// export default BackgroundInfo;
"use client";

import React, { FC, useEffect } from "react";
import {
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
  UseFormSetValue,
} from "react-hook-form";

interface BackgroundInfoProps {
  prefix: string; // e.g., "personalDetail.backgroundInfo"
  register: UseFormRegister<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  errors: FieldErrors<any>;
}

const BackgroundInfo: FC<BackgroundInfoProps> = ({
  prefix,
  register,
  watch,
  setValue,
  errors,
}) => {
  // Set default values for backend keys on mount
  useEffect(() => {
    setValue(`${prefix}.hasImmigrationHistory`, false);
    setValue(`${prefix}.immigrationCountry`, "");
    setValue(`${prefix}.hasMedicalIssue`, false);
    setValue(`${prefix}.medicalIssue`, "");
    setValue(`${prefix}.hasVisaRefusal`, false);
    setValue(`${prefix}.visaRefusalCountry`, "");
    setValue(`${prefix}.visaName`, "");
    setValue(`${prefix}.hasCriminalRecord`, false);
    setValue(`${prefix}.crimeDetails`, "");
  }, [prefix, setValue]);

  // Watch values and ensure they are boolean
  const hasImmigrationHistory = watch(`${prefix}.hasImmigrationHistory`);
  const hasMedicalIssue = watch(`${prefix}.hasMedicalIssue`);
  const hasVisaRefusal = watch(`${prefix}.hasVisaRefusal`);
  const hasCriminalRecord = watch(`${prefix}.hasCriminalRecord`);

  return (
    <div className="space-y-10 py-3 border-b border-gray-200">
      {/* Immigration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-800">
            Has applicant applied for any type of immigration into any country?
          </p>
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register(`${prefix}.hasImmigrationHistory`)}
                value="false"
                checked={hasImmigrationHistory === false}
                onChange={() =>
                  setValue(`${prefix}.hasImmigrationHistory`, false)
                }
              />
              <span className="text-sm text-gray-800">No</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register(`${prefix}.hasImmigrationHistory`)}
                value="true"
                checked={hasImmigrationHistory === true}
                onChange={() =>
                  setValue(`${prefix}.hasImmigrationHistory`, true)
                }
              />
              <span className="text-sm text-gray-800">Yes</span>
            </label>
          </div>
        </div>

        <select
          {...register(`${prefix}.immigrationCountry`)}
          disabled={!hasImmigrationHistory}
          className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 text-sm disabled:cursor-not-allowed"
        >
          <option value="">Select Country</option>
          <option value="Australia">Australia</option>
          <option value="Canada">Canada</option>
          <option value="USA">USA</option>
        </select>
      </div>

      {/* Medical */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-800">
            Does applicant suffer from a serious medical condition?
          </p>
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register(`${prefix}.hasMedicalIssue`)}
                value="false"
                checked={hasMedicalIssue === false}
                onChange={() => setValue(`${prefix}.hasMedicalIssue`, false)}
              />
              <span className="text-sm text-gray-800">No</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register(`${prefix}.hasMedicalIssue`)}
                value="true"
                checked={hasMedicalIssue === true}
                onChange={() => setValue(`${prefix}.hasMedicalIssue`, true)}
              />
              <span className="text-sm text-gray-800">Yes</span>
            </label>
          </div>
        </div>

        <input
          {...register(`${prefix}.medicalIssue`)}
          disabled={!hasMedicalIssue}
          placeholder="Specify Here..."
          className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 text-sm disabled:cursor-not-allowed"
        />
      </div>

      {/* Visa Refusal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-800">
            Has applicant Visa refusal for any country?
          </p>
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register(`${prefix}.hasVisaRefusal`)}
                value="false"
                checked={hasVisaRefusal === false}
                onChange={() => setValue(`${prefix}.hasVisaRefusal`, false)}
              />
              <span className="text-sm text-gray-800">No</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register(`${prefix}.hasVisaRefusal`)}
                value="true"
                checked={hasVisaRefusal === true}
                onChange={() => setValue(`${prefix}.hasVisaRefusal`, true)}
              />
              <span className="text-sm text-gray-800">Yes</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            {...register(`${prefix}.visaRefusalCountry`)}
            disabled={!hasVisaRefusal}
            placeholder="Select Country"
            className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 text-sm disabled:cursor-not-allowed"
          />
          <input
            {...register(`${prefix}.visaName`)}
            disabled={!hasVisaRefusal}
            placeholder="Type of Visa"
            className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 text-sm disabled:cursor-not-allowed"
          />
        </div>
      </div>

      {/* Criminal Record */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-800">
            Has applicant ever been convicted of a criminal offence?
          </p>
          <div className="flex items-center gap-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register(`${prefix}.hasCriminalRecord`)}
                value="false"
                checked={hasCriminalRecord === false}
                onChange={() => setValue(`${prefix}.hasCriminalRecord`, false)}
              />
              <span className="text-sm text-gray-800">No</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register(`${prefix}.hasCriminalRecord`)}
                value="true"
                checked={hasCriminalRecord === true}
                onChange={() => setValue(`${prefix}.hasCriminalRecord`, true)}
              />
              <span className="text-sm text-gray-800">Yes</span>
            </label>
          </div>
        </div>

        <input
          {...register(`${prefix}.crimeDetails`)}
          disabled={!hasCriminalRecord}
          placeholder="Specify Here..."
          className="w-full rounded-lg bg-gray-100 border border-gray-200 px-4 py-3 text-sm disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default BackgroundInfo;
