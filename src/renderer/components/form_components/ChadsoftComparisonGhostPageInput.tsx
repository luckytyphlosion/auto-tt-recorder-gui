import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import { chadsoftGhostPageLinkRegex } from "../../../shared/shared-types";

export function ChadsoftComparisonGhostPageInput() {
  const {register, formState} = useFormContextAutoTT();

  return (
    <div className="grid-contents2">
      <label htmlFor="chadsoft-comparison-ghost-page" className="start-label2">Chadsoft comparison ghost page link: </label>
      <div className="start-label-contents">
        <input type="text"
          {...register("chadsoft-comparison-ghost-page", {
            required: {
              value: true,
              message: "This input is required."
            },
            pattern: {
              value: chadsoftGhostPageLinkRegex,
              message: "Must be a valid chadsoft ghost link."
            }
          })}
        ></input>
        <SimpleErrorMessage name="chadsoft-comparison-ghost-page"/>
      </div>
    </div>
  );
}
