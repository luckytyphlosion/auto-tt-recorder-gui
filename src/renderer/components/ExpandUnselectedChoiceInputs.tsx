
import React, { useEffect } from "react";
import { FormProvider, UseFormReturn, useWatch } from "react-hook-form";
import { AutoTTRecConfigFormFields, AutoTTRecConfigFormFieldName } from "../auto-tt-rec-form-field-types";
import { ReadTemplateResult, ReadTemplateStatus, AutoTTRecConfig } from "../../shared/shared-types";

export function ExpandUnselectedChoiceInputs(props: {
  disabled: boolean,
  formMethods: UseFormReturn<AutoTTRecConfigFormFields, any, undefined>,
  validateFormViaSubmitSync: (keepErrors: boolean, inputNameToFocus?: AutoTTRecConfigFormFieldName) => void
}) {
  const expandUnselectedChoiceInputs = useWatch({
    name: "expand-unselected-choice-inputs",
    control: props.formMethods.control
  });

  function updateExpandUnselectedChoiceInputs(event: React.ChangeEvent<HTMLInputElement>) {
    props.formMethods.setValue("expand-unselected-choice-inputs", event.target.checked);
    props.validateFormViaSubmitSync(true, "expand-unselected-choice-inputs");
  }

  useEffect(() => {
    const expandUnselectedChoiceInputsNoFILLME = expandUnselectedChoiceInputs === "<FILLME>" ? false : expandUnselectedChoiceInputs;
    window.api.setAndSaveExpandUnselectedChoiceInputs(expandUnselectedChoiceInputsNoFILLME);
  }, [expandUnselectedChoiceInputs]);

  return (
    <div>
      <label htmlFor="expand-unselected-choice-inputs">Expand unselected choice inputs (advanced): </label>
      <input type="checkbox" disabled={props.disabled} checked={expandUnselectedChoiceInputs !== "<FILLME>" ? expandUnselectedChoiceInputs : false} onChange={updateExpandUnselectedChoiceInputs}/>
    </div>
  );
}
