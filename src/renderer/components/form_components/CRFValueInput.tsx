import React from "react";
import { useFormContext } from "react-hook-form";

export function CRFValueInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="crf-value">Quality (lower is better but file size becomes larger):</label>
      <input type="number" min={0} max={51}
        {...register("crf-value", {valueAsNumber: true})}
      ></input>
    </div>
  );
}
