import React from "react";
import { useFormContext } from "react-hook-form";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function TrackNameInput() {
  const {register} = useFormContext();

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
