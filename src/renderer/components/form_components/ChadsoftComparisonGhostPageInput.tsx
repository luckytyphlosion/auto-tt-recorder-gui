import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function ChadsoftComparisonGhostPageInput() {
  const {register, formState} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="chadsoft-comparison-ghost-page">Chadsoft comparison ghost page link: </label>
      <input type="text"
        {...register("chadsoft-comparison-ghost-page", {
          required: {
            value: true,
            message: "This input is required."
          },
          pattern: {
            value: /^https:\/\/(?:www\.)?chadsoft\.co\.uk\/time-trials\/rkgd\/([0-9A-Fa-f]{2}\/[0-9A-Fa-f]{2}\/[0-9A-Fa-f]{36})\.html$/,
            message: "Must be a valid chadsoft ghost link."
          }
        })}
      ></input>
      <SimpleErrorMessage name="chadsoft-comparison-ghost-page"/>
    </div>
  );
}
