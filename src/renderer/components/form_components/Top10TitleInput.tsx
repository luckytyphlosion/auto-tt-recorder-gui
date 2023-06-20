import React from "react";
import { useFormContext } from "react-hook-form";

export function Top10TitleInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="top-10-title">Top 10 Title: </label>
      <input type="text"
        {...register("top-10-title", {required: false})}
      ></input>
    </div>
  );
}
