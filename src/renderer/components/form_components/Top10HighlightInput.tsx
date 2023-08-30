import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";

export function Top10HighlightInput() {
  const {register, formState} = useFormContextAutoTT();

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="top-10-highlight">Which entry to highlight and record? </label>
      <div className="start-label-contents">
        <input type="number" id="top-10-highlight"
          {...register("top-10-highlight", {
            required: {
              value: true,
              message: "This input is required."
            },
            valueAsNumber: true,
            validate: (value) => (value >= 1 && value <= 10) || "Entry to highlight must be between 1 and 10."
          })}
        ></input>
        <SimpleErrorMessage name="top-10-highlight"/>
      </div>
    </div>
  );
}
