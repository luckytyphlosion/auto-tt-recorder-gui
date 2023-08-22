import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function MKChannelGhostDescriptionInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="mk-channel-ghost-description">Ghost Description: </label>
      <div className="start-label-contents">
        <input type="text" id="mk-channel-ghost-description"
          {...register("mk-channel-ghost-description", {
            required: {
              value: true,
              message: "This input is required."
            }})}
        ></input>
        <SimpleErrorMessage name="mk-channel-ghost-description"/>
      </div>
    </div>
  );
}
