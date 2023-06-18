import React from "react";
import { useFormContext } from "react-hook-form";

export function MKChannelGhostDescriptionInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="mk-channel-ghost-description">Ghost Description: </label>
      <input type="text"
        {...register("mk-channel-ghost-description", {required: true})}
      ></input>
    </div>
  );
}
