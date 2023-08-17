import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function CRFValueInput(props: {addCRFReminderToLabel: boolean}) {
  const {register} = useFormContextAutoTT();

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="crf-value">Quality{props.addCRFReminderToLabel ? " (For CRF)" : ""}:</label>
      <div className="start-label-contents">
        <input type="number" id="start-label"
          {...register("crf-value", {valueAsNumber: true, required: {
            value: true,
            message: "This input is required."
          },
          validate: (value) => (value >= 0 && value <= 51) || "Quality must be between 0 and 51."
          })}
        ></input>
        <SimpleErrorMessage name="crf-value"/>
      </div>
      <div className="start-label"></div>
      <div className="start-label-contents" style={{marginBottom: "1em"}}>
        Lower is better but file size becomes larger
      </div>
    </div>
  );
}
