import { useWatch, useFormContext } from "react-hook-form";

import { AutoTTRecConfigFormFields, AutoTTRecConfigFormBooleanArgName, AutoTTRecConfigFormChoiceArgName } from "./auto-tt-rec-form-field-types";

export function useFormContextAutoTT() {
  return useFormContext<AutoTTRecConfigFormFields>();
}

export function useWatchAutoTT<K extends keyof AutoTTRecConfigFormFields>(props: {name: K}) {
  const {control} = useFormContextAutoTT();
  return useWatch({name: props.name, control: control});
}

export function useWatchExpandUnselectedChoiceInputs() {
  return useWatchAutoTT({name: "expand-unselected-choice-inputs"});
}

export function isValueOrFillmeIsValueMaker() {
  const expandUnselectedChoiceInputs = useWatchExpandUnselectedChoiceInputs();

  return function(value: string | boolean | "<FILLME>", expectedValue: string | boolean) {
    return value === expectedValue || (expandUnselectedChoiceInputs && value === "<FILLME>");
  }
}
