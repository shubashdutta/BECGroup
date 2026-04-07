import { Control } from "react-hook-form";

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

export type TestType = {
  testType: string;
  overallScore: number;
  examDate: string;
  quantitative: number;
  verbal: number;
  analyticWriting: string;
  integratedReasoning: number;
  isResultReceivable: boolean;
  resultDate: string;
  hasWaiver: boolean;
  listening: number;
  reading: number;
  speaking: number;
  writing: number;
  englishMarks12th: number;
  mediumOfInstruction: string;
};

export type TextAreaProps = {
  label: string;
  className?: string;
  name: string;
  control: Control<any>;
  errors: any;
  defaultValue?: string;
  validation?: any;
  isRequired?: boolean;
  height?: any;
};
