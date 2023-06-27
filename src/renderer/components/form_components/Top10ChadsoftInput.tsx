import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function Top10ChadsoftInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="top-10-chadsoft">Chadsoft leaderboard link: </label>
      <input type="text"
        {...register("top-10-chadsoft", {required: {
          value: true,
          message: "This input is required"
        }, pattern: {
          value: /^https:\/\/(?:www\.)?chadsoft\.co\.uk\/time-trials\/leaderboard\/[0-1][0-9A-Fa-f]\/[0-9A-Fa-f]{40}\/(?:00|01|02|03|04|05|06)\.html(?:#.*)$/,
          message: "Must be a valid chadsoft leaderboard link."
        }})}
      ></input>
      <SimpleErrorMessage name="top-10-chadsoft"/>
    </div>
  );
}
