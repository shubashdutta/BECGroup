/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from "react-hook-form";

export type SelectFieldProps = {
  label?: string;
  classname?: string;
  name: string;
  control: Control<any>;
  errors: any;
  defaultValue?: string;
  validation?: any;
  options: any;
  value?: string;
  isMulti?: any;
  isRequired?: boolean;
  isDisabled?: any;
  formatGroupLabel?: any;
  fontSize?: boolean;
  onChange?: any;
};
