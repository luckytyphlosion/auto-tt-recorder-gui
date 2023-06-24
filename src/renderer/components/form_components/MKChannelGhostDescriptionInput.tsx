import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function MKChannelGhostDescriptionInput() {
  const {register} = useFormContextAutoTT();

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
