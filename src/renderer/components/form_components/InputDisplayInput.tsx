import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export type InputDisplay = "gcn" | "none";

export function InputDisplayInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="input-display">Input Display: </label>
      <label htmlFor="input-display-gcn-classic">GCN/Classic: </label>
      <input type="radio" id="input-display-gcn-classic" value="gcn"
        {...register("input-display")}
      ></input>
      <label htmlFor="input-display-none">None: </label>
      <input type="radio" id="input-display-none" value="none"
        {...register("input-display")}
      ></input>
    </div>
  );
}
