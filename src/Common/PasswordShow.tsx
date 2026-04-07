/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, type FC } from "react";
import { Form, FormGroup } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface PasswordType {
  register: any;
  label: string;
  errors: any;
  required?: boolean;
  name: string;
  validation?: any;
}

const PasswordShow: FC<PasswordType> = ({
  register,
  label,
  errors,
  required,
  name,
  validation,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormGroup className="flex flex-col">
      <Form.Label className="mb-1">
        {label} {required && <span className="text-red-900">*</span>}
      </Form.Label>
      <div className="relative">
        <Form.Control
          type={showPassword ? "text" : "password"}
          placeholder={`Enter ${label}`}
          autoComplete="new-password"
          {...register(name, validation)}
          id={name}
          className={`w-full border px-2 py-2 rounded focus:outline-none focus:ring-blue-900 ${
            errors?.[name] ? "border-red-500" : "border-gray-300"
          }`}
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-600"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </span>
      </div>
      {errors?.[name] && (
        <div className="text-red-500 text-lg mt-1">{errors[name].message}</div>
      )}{" "}
    </FormGroup>
  );
};

export default PasswordShow;
