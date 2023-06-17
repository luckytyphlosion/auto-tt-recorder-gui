
import React from "react";
import { useFormContext } from "react-hook-form";

export function QualityInput() {
  const {register} = useFormContext();
  return (
    <div>
      <label htmlFor="high-quality">High quality (1440p vs 480p): </label>
      <input type="checkbox" {...register("high-quality")}/>
    </div>
  );
}
