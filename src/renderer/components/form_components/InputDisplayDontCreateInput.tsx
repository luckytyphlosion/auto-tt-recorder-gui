
import React from "react";
import { useFormContext } from "react-hook-form";

export function InputDisplayDontCreateInput() {
  const {register} = useFormContext();
  return (
    <div>
      <label htmlFor="input-display-dont-create">Assume input display file already exists (input-display-dont-create): </label>
      <input type="checkbox" {...register("input-display-dont-create")}/>
    </div>
  );
}
