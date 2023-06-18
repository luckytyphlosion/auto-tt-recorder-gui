import React from "react";
import { useFormContext } from "react-hook-form";

export function InputDisplayInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="input-display">Input Display: </label>
      <label htmlFor="input-display-gcn-classic">GCN/Classic: </label>
      <input type="radio" id="input-display-gcn-classic" value="gcn-classic"
        {...register("input-display")}
      ></input>
      <label htmlFor="input-display-none">None: </label>
      <input type="radio" id="input-display-none" value="none"
        {...register("input-display")}
      ></input>
    </div>
  );
}
