
import React from "react";
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";
import { ImportTemplateResult, ImportTemplateStatus, AutoTTRecConfig } from "../../shared/shared-types";

export function ExpandUnselectedChoiceInputs(props: {
  disabled: boolean,
  formMethods: UseFormReturn<AutoTTRecConfigFormFields, any, undefined>,
}) {

  function updateExpandUnselectedChoiceInputs(event: React.ChangeEvent<HTMLInputElement>) {
    props.formMethods.setValue("expand-unselected-choice-inputs", event.target.checked);
  }

  return (
    <div>
      <label htmlFor="expand-unselected-choice-inputs">Expand unselected choice inputs (advanced): </label>
      <input type="checkbox" disabled={props.disabled} onChange={updateExpandUnselectedChoiceInputs}/>
    </div>
  );
}
