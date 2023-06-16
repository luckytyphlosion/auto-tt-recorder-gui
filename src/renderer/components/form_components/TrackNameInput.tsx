import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface TrackNameInputProps {
  register: UseFormRegister<FieldValues>;
}

function TrackNameInput(props: TrackNameInputProps) {
  return (
    <div>
      <label htmlFor="track-name">Track name: </label>
      <input type="text"
        id="track-name" {...props.register("track-name", {required: true})}
      ></input>
    </div>
  );
}

export default TrackNameInput;