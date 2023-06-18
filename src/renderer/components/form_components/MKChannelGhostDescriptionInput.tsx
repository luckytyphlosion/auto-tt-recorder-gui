import React from "react";
import { useFormContext } from "react-hook-form";

export function MKChannelGhostDescriptionInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="mk-channel-ghost-description">Chadsoft ghost page link: </label>
      <input type="text"
        {...register("chadsoft-ghost-page", {required: true})}
      ></input>
    </div>
  );
}
