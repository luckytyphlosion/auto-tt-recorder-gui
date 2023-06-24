import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function Top10TitleInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="top-10-title">Top 10 Title: </label>
      <input type="text"
        {...register("top-10-title", {required: false})}
      ></input>
    </div>
  );
}
