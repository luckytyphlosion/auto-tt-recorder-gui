import React, { useState, useEffect } from "react";
import { useFormContextAutoTT, useTriggerAndRerenderAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { chadsoftGhostPageLinkRegex } from "../../../shared/shared-types";
import { TextInput } from "../TextInput";

import useRenderCounter from "../../RenderCounter";

export function ChadsoftGhostPageInput() {
  const {register} = useFormContextAutoTT();
  const triggerAndRerender = useTriggerAndRerenderAutoTT();

  //console.log("formState.isSubmitted:", formState.isSubmitted);
  const renderCounter = useRenderCounter(true, "ChadsoftGhostPageInput");

  async function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    console.log(e);
    await triggerAndRerender("chadsoft-ghost-page");
  }

  /*useEffect(() => {

  }, [triggerToggle]);*/

      {/*
    <div className="grid-contents">
      <label className="start-label">Ghost page link: </label>
      <div className="start-label-contents">
        <input type="text"
          {...register("chadsoft-ghost-page", {
            required: {
              value: true,
              message: "This input is required."
            },
            onBlur: onBlur,
            pattern: {
              value: chadsoftGhostPageLinkRegex,
              message: "Must be a valid chadsoft ghost link."
            },
          })}
        ></input>
        <SimpleErrorMessage name="chadsoft-ghost-page"/>
        {renderCounter}
      </div>
    </div>
    */}

  return (
    <TextInput name="chadsoft-ghost-page" startLabel="Ghost page link: " pattern={
      {value: chadsoftGhostPageLinkRegex, message: "Must be a valid chadsoft ghost link."}
    }/>
  );
}
