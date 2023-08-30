import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";

export function EndingDelayInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="ending-delay">Ending video delay (in frames):</label>
      <div className="start-label-contents">
        <input type="number" id="ending-delay"
          {...register("ending-delay", {valueAsNumber: true, required: {
            value: true,
            message: "This input is required."
          },
          validate: (value) => (value >= 0) || "Ending delay must be positive or zero."
          })}
        ></input>
        <SimpleErrorMessage name="ending-delay"/>
      </div>
    </div>
  );
}
