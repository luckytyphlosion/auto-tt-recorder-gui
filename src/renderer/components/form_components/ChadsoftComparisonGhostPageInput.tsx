import React from "react";
import { useFormContext } from "react-hook-form";

export function ChadsoftComparisonGhostPageInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="chadsoft-comparison-ghost-page">Chadsoft comparison ghost page link: </label>
      <input type="text"
        {...register("chadsoft-comparison-ghost-page", {required: false})}
      ></input>
    </div>
  );
}
