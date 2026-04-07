import React from "react";
import Select, { SingleValue } from "react-select";

// Define the option type
interface Option {
  label: string;
  value: string;
}

// Props for SortBy component
interface SortByProps {
  options?: Option[];
  placeholder?: string;
  onChange?: (selected: Option | null) => void;
}

const SortBy: React.FC<SortByProps> = ({
  options,
  onChange,
  placeholder = "Sort By",
}) => {
  const handleChange = (selectedOption: SingleValue<Option>) => {
    if (onChange) {
      onChange(selectedOption ?? null); // selectedOption can be null if cleared
    }
  };

  return (
    <div className=" w-full">
      <Select
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        isClearable
      />
    </div>
  );
};

export default SortBy;
