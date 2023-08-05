
import React, { useState, useEffect } from "react";
import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";
import { ReadTemplateResult, ReadTemplateStatus, AutoTTRecConfig, LoadFormInputsType } from "../../shared/shared-types";

export function ValidateFormOnOpen(props: {
  disabled: boolean,
  initialValue: boolean
}) {
  const [validateFormOnOpen, setValidateFormOnOpen] = useState<boolean>(props.initialValue);

  async function updateValidateFormOnOpen(event: React.ChangeEvent<HTMLInputElement>) {
    let newValue = event.target.checked;
    setValidateFormOnOpen(newValue);
    await window.api.setAndSaveValidateFormOnOpen(newValue);
  }

  return (
    <div>
      <label htmlFor="validate-form-on-open">Validate form on opening the program: </label>
      <input type="checkbox" id="validate-form-on-open" disabled={props.disabled} checked={validateFormOnOpen} onChange={updateValidateFormOnOpen}/>
    </div>
  );
}
