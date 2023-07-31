import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { chadsoftGhostPageLinkRegex } from "../../../shared/shared-types";

import useRenderCounter from "../../RenderCounter";

export function ChadsoftGhostPageInput() {
  const {register, formState} = useFormContextAutoTT();

  //console.log("formState.isSubmitted:", formState.isSubmitted);
  const renderCounter = useRenderCounter(true, "ChadsoftGhostPageInput");

  return (
    <div>
        <label htmlFor="chadsoft-ghost-page">Chadsoft ghost page link: </label>
        <input type="text"
          {...register("chadsoft-ghost-page", {
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
        <SimpleErrorMessage name="chadsoft-ghost-page"/>
        {renderCounter}
    </div>
  );
}
