import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function EndingDelayInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="ending-delay">Ending video delay (in frames):</label>
      <input type="number"
        {...register("ending-delay", {valueAsNumber: true, required: {
          value: true,
          message: "This input is required."
        },
        validate: (value) => (value >= 0) || "Ending delay must be positive or zero."
        })}
      ></input>
      <SimpleErrorMessage name="ending-delay"/>
    </div>
  );
}
