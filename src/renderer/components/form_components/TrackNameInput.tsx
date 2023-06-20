import React from "react";
import { useFormContext } from "react-hook-form";

export function TrackNameInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="track-name">Track name: </label>
      <input type="text" {...register("track-name", {required: false})}
      ></input>
    </div>
  );
}
