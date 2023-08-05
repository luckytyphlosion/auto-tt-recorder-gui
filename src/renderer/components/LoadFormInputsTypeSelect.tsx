
import React, { useState } from "react";
import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";
import { ReadTemplateResult, ReadTemplateStatus, AutoTTRecConfig, LoadFormInputsType } from "../../shared/shared-types";

export function LoadFormInputsTypeSelect(props: {
  disabled: boolean,
  initialValue: LoadFormInputsType
}) {
  const [loadFormInputsType, setLoadFormInputsType] = useState<LoadFormInputsType>(props.initialValue);

  async function updateLoadFormInputsSelect(event: React.ChangeEvent<HTMLInputElement>) {
    let newValue = event.target.value;
    if (newValue === "load-form-inputs-select-last-recorded" || newValue === "load-form-inputs-select-last-template" || newValue === "load-form-inputs-select-default") {
      setLoadFormInputsType(newValue);
      await window.api.saveLoadFormInputsType(newValue);
    }
  }

  return (
    <div>
      <label htmlFor="load-form-inputs-select">When opening the program, pre-fill options from: </label>
      <div id="load-form-inputs-select">
        <label htmlFor="load-form-inputs-select-last-recorded">Last recorded options: </label>
        <input type="radio" id="load-form-inputs-select-last-recorded" name="load-form-inputs-select" value="load-form-inputs-select-last-recorded" checked={loadFormInputsType === "load-form-inputs-select-last-recorded"} onChange={updateLoadFormInputsSelect} disabled={props.disabled}/>
        <label htmlFor="load-form-inputs-select-last-template">Last opened template: </label>
        <input type="radio" id="load-form-inputs-select-last-template" name="load-form-inputs-select" value="load-form-inputs-select-last-template" checked={loadFormInputsType === "load-form-inputs-select-last-template"} onChange={updateLoadFormInputsSelect} disabled={props.disabled}/>
        <label htmlFor="load-form-inputs-select-last-template">Default options: </label>
        <input type="radio" id="load-form-inputs-select-last-template" name="load-form-inputs-select" value="load-form-inputs-select-default" checked={loadFormInputsType === "load-form-inputs-select-default"} onChange={updateLoadFormInputsSelect} disabled={props.disabled}/>
      </div>
    </div>
  );
}
