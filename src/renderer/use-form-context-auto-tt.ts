import { useWatch, useFormContext } from "react-hook-form";
import { useState } from "react";

import { AutoTTRecConfigFormFields, AutoTTRecConfigFormBooleanArgName, AutoTTRecConfigFormChoiceArgName } from "./auto-tt-rec-form-field-types";

export function useFormContextAutoTT() {
  return useFormContext<AutoTTRecConfigFormFields>();
}

export function useTriggerAndRerenderAutoTT<K extends keyof AutoTTRecConfigFormFields>(atCreationName?: K) {
  const [forceUpdate, setForceUpdate] = useState<number>(0);
  const {trigger} = useFormContextAutoTT();

  return async function(atCallName?: K) {
    let name: K | undefined;
    if (atCallName !== undefined) {
      name = atCallName;
    } else if (atCreationName !== undefined) {
      name = atCreationName;
    }
    if (name !== undefined) {
      await trigger(name);
    }
    setForceUpdate((forceUpdate: number) => (forceUpdate + 1));
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

