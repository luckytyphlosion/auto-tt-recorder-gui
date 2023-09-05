import React from "react";
import { useFormContextAutoTT, lateValidateNumberInputMaker } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";
import useRenderCounter from "../../RenderCounter";

export function CRFValueInput(props: {addCRFReminderToLabel: boolean}) {
  const {register} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "CRFValueInput");
  const onBlur = lateValidateNumberInputMaker("crf-value");

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="crf-value">Quality:</label>
      <div className="start-label-contents">
        <input type="number" id="start-label" placeholder="15"
          {...register("crf-value", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "This input is required."
            },
            validate: (value) => (value >= 0 && value <= 51) || "Quality must be between 0 and 51.",
            onBlur: onBlur
          })}
        ></input>
        {renderCounter}
      </div>
      <label className="start-label form-input-notes--start-label">{props.addCRFReminderToLabel ? " (For CRF)" : ""}</label>
      <div className="start-label-contents">
        <p className="form-input-notes">Lower is better but file size becomes larger</p>
        <SimpleErrorMessage name="crf-value" marginBlockDisplay={true} negativeTopMargin={true}/>
      </div>
    </div>
  );
}
