import { useWatch, useFormContext } from "react-hook-form";
import { useState } from "react";

import { AutoTTRecConfigFormFields, AutoTTRecConfigFormBooleanArgName, AutoTTRecConfigFormChoiceArgName } from "./auto-tt-rec-form-field-types";

export function useFormContextAutoTT() {
  return useFormContext<AutoTTRecConfigFormFields>();
}

export function useTriggerAndRerenderAutoTT<K extends keyof AutoTTRecConfigFormFields>(name: K) {
  const [fieldErrorMessage, setFieldErrorMessage] = useState<string>("");
  const {trigger, formState} = useFormContextAutoTT();

  return async function() { 
    if (name !== undefined) {
      console.log(`before trigger ${name} formState:`, formState);
      await trigger(name);
      console.log(`after trigger ${name} formState:`, formState);
      let newFieldErrorMessage = formState.errors[name]?.message;
      if (newFieldErrorMessage === undefined) {
        newFieldErrorMessage = "";
      }
      console.log("newFieldErrorMessage:", newFieldErrorMessage);
      setFieldErrorMessage(newFieldErrorMessage);
    }
  }
}

export function useWatchAutoTT<K extends keyof AutoTTRecConfigFormFields>(props: {name: K}) {
  const {control} = useFormContextAutoTT();
  return useWatch({name: props.name, control: control});
}

export function useWatchExpandUnselectedChoiceInputs() {
  return useWatchAutoTT({name: "expand-unselected-choice-inputs"});
}

export function isValueOrFILLMEIsValueMaker(debugName?: string) {
  const expandUnselectedChoiceInputs = useWatchExpandUnselectedChoiceInputs();
  /*if (debugName !== undefined) {
    console.log(`Making isValueOrFILLMEIsValue for ${debugName}`);
  }*/
  return function(value: string | boolean | "<FILLME>", ...expectedValues: Array<string | boolean>) {
    return expectedValues.includes(value) || (expandUnselectedChoiceInputs && value === "<FILLME>");
  }
}

