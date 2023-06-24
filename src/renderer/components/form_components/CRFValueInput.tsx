import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function CRFValueInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="crf-value">Quality (lower is better but file size becomes larger):</label>
      <input type="number"
        {...register("crf-value", {valueAsNumber: true, required: {
          value: true,
          message: "This input is required."
        },
        validate: (value) => (value >= 0 && value <= 51) || "Quality must be between 0 and 51."
        })}
      ></input>
      <SimpleErrorMessage name="crf-value"/>
    </div>
  );
}
