import React from "react";
import { useFormContext } from "react-hook-form";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function MKChannelGhostDescriptionInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="mk-channel-ghost-description">Ghost Description (top left at start of video): </label>
      <input type="text"
        {...register("mk-channel-ghost-description", {
          required: {
            value: true,
            message: "This input is required."
          }})}
      ></input>
      <SimpleErrorMessage name="mk-channel-ghost-description"/>
    </div>
  );
}
