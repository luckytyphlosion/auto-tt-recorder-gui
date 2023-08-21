import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import { chadsoftGhostPageLinkRegex } from "../../../shared/shared-types";

export function ChadsoftComparisonGhostPageInput() {
  const {register, formState} = useFormContextAutoTT();

  return (
    <div className="grid-contents">
      <label htmlFor="chadsoft-comparison-ghost-page" className="start-label">Comparison ghost page link: </label>
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
      </div>
      <div className="start-label-error">
        <SimpleErrorMessage name="chadsoft-comparison-ghost-page"/>
      </div>
    </div>
  );
}
