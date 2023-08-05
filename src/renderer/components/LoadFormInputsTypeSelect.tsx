
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
    if (newValue === "load-form-inputs-select-last-recorded" || newValue === "load-form-inputs-select-last-template") {
      setLoadFormInputsType(newValue);
      await window.api.saveLoadFormInputsType(newValue);
    }
  }

  return (
    <div>
      <label htmlFor="load-form-inputs-select">When opening the program, load pre-filled options from: </label>
      <span id="load-form-inputs-select">
        <label htmlFor="load-form-inputs-select-last-recorded">Last recorded options: </label>
        <input type="radio" id="load-form-inputs-select-last-recorded" name="load-form-inputs-select" value="load-form-inputs-select-last-recorded" checked={loadFormInputsType === "load-form-inputs-select-last-recorded"} onChange={updateLoadFormInputsSelect}/>
        <label htmlFor="load-form-inputs-select-last-template">Last opened template: </label>
        <input type="radio" id="load-form-inputs-select-last-template" name="load-form-inputs-select" value="load-form-inputs-select-last-template" checked={loadFormInputsType === "load-form-inputs-select-last-template"} onChange={updateLoadFormInputsSelect}/>
      </span>
    </div>
  );
}
