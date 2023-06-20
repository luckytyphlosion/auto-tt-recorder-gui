import React from "react";
import { useFormContext } from "react-hook-form";

export function Top10ChadsoftInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="top-10-chadsoft">Chadsoft leaderboard link: </label>
      <input type="text"
        {...register("top-10-chadsoft", {required: false})}
      ></input>
    </div>
  );
}
