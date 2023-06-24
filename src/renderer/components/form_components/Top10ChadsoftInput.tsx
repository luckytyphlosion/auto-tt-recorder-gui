import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function Top10ChadsoftInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="top-10-chadsoft">Chadsoft leaderboard link: </label>
      <input type="text"
        {...register("top-10-chadsoft", {required: false})}
      ></input>
    </div>
  );
}
