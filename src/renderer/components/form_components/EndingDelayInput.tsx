import React from "react";
import { useFormContextAutoTT, lateValidateNumberInputMaker } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";

export function EndingDelayInput() {
  const {register} = useFormContextAutoTT();
  const onBlur = lateValidateNumberInputMaker("ending-delay");

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="ending-delay">Ending video delay:</label>
      <div className="start-label-contents">
        <input type="number" id="ending-delay"
          {...register("ending-delay", {valueAsNumber: true, required: {
            value: true,
            message: "This input is required."
          },
          validate: (value) => (value >= 0) || "Ending delay must be positive or zero.",
          onBlur: onBlur
          })}
        ></input>
        <span id="ending-delay__in-frames"> frames</span>
        <SimpleErrorMessage name="ending-delay"/>
      </div>
    </div>
  );
}
