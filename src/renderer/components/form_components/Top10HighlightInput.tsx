import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { ErrorMessage } from "@hookform/error-message";

export function Top10HighlightInput() {
  const {register, formState} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="top-10-highlight">Which entry to highlight? </label>
      <input type="number" min={1} max={10}
        {...register("top-10-highlight", {
          required: {
            value: true,
            message: "This input is required."
          },
          min: {
            value: 1,
            message: "Entry to highlight must be between 1 and 10."
          },
          max: {
            value: 10,
            message: "Entry to highlight must be between 1 and 10."
          }
        })}
      ></input>
      <ErrorMessage
        errors={formState.errors}
        name="top-10-highlight"
        render={({ messages }) => {
          console.log("messages", messages);
          return "TODO";/*messages
            ? _.entries(messages).map(([type, message]: [string, string]) => (
                <p key={type}>{message}</p>
              ))
            : null;*/
        }}
      />
    </div>
  );
}
