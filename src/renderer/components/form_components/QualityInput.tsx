
import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface QualityInputProps {
  register: UseFormRegister<FieldValues>;
}

export function QualityInput(props: QualityInputProps) {
  return (
    <div>
      <label htmlFor="high-quality">High quality (1440p vs 480p): </label>
      <input type="checkbox" {...props.register("high-quality")}/>
    </div>
  );
}
