import React from "react";
import { useFormContext } from "react-hook-form";

export function ChadsoftGhostPageInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="chadsoft-ghost-page">Chadsoft ghost page link: </label>
      <input type="text"
        {...register("chadsoft-ghost-page", {required: true})}
      ></input>
    </div>
  );
}
