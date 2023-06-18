
import React from "react";
import { useFormContext } from "react-hook-form";

export function KeepWindowInput() {
  const {register} = useFormContext();
  return (
    <div>
      <label htmlFor="keep-window">Show Dolphin window while running: </label>
      <input type="checkbox" {...register("keep-window")}/>
    </div>
  );
}
