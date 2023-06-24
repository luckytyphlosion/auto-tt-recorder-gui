import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function TrackNameInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="track-name">Track name: </label>
      <input type="text" {...register("track-name", {required: {
        value: true,
        message: "This input is required."
      }})}
      ></input>
      <SimpleErrorMessage name="track-name"/>
    </div>
  );
}
