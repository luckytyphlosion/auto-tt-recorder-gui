import { useWatch, useFormContext, UseFormTrigger, FormState, useFormState } from "react-hook-form";
import { useState, useEffect } from "react";
import { undefinedToNullStr } from "../shared/util-shared";

import { AutoTTRecConfigFormFields, AutoTTRecConfigFormFieldName, AutoTTRecConfigFormBooleanArgName, AutoTTRecConfigFormChoiceArgName } from "./auto-tt-rec-form-field-types";

export function useFormContextAutoTT() {
  return useFormContext<AutoTTRecConfigFormFields>();
}

export function useTriggerAndRerenderAutoTT<K extends keyof AutoTTRecConfigFormFields>(name: K) {
  const [fieldErrorMessage, setFieldErrorMessage] = useState<string>("");
  const [noErrorMessageTryAgainCounter, setNoErrorMessageTryAgainCounter] = useState(0);
  //const formState2 = useFormState<AutoTTRecConfigFormFields>({name: name, exact: true});
  const {trigger, getFieldState, formState} = useFormContextAutoTT();
  //const formState2 = formState;

  //console.log("formState2:", formState2);
  // useEffect(() => {
  //   console.log("Form state errors trigger formState:", formState);
  // }, [noErrorMessageTryAgainCounter]);


  return async function() { 
    if (name !== undefined) {
      //console.log(`before trigger ${name} formState:`, formState2);
      await trigger(name);
      //console.log(`after trigger ${name} formState:`, formState2);

      //console.log("getFieldState:", );
      //let newFieldErrors = formState2.errors[name];
      //console.log("newFieldErrors:", newFieldErrors);
      let fieldState = getFieldState(name);
      console.log(`useTriggerAndRerender-${name} fieldState:`, fieldState);
      let formStateErrorMessage = undefinedToNullStr(formState.errors[name]?.message);
      let newFieldErrorMessage = undefinedToNullStr(fieldState.error?.message); //formState2.errors[name]?.message;
      console.log(`useTriggerAndRerender-${name} newFieldErrorMessage:`, newFieldErrorMessage, ", formStateErrorMessage:", formStateErrorMessage);
      setFieldErrorMessage(newFieldErrorMessage);
      // if (newFieldErrorMessage === "") {
      //   setNoErrorMessageTryAgainCounter((noErrorMessageTryAgainCounter) => (noErrorMessageTryAgainCounter + 1));
      // }
    }
  }
}

export async function triggerAndRerenderAutoTT(name: AutoTTRecConfigFormFieldName, trigger: UseFormTrigger<AutoTTRecConfigFormFields>, formState: FormState<AutoTTRecConfigFormFields>, setFieldErrorMessage: React.Dispatch<React.SetStateAction<string>>) {
  if (name !== undefined) {
    console.log(`manual before trigger ${name} formState:`, formState);
    await trigger(name, {shouldFocus: true});
    console.log(`manual after trigger ${name} formState:`, formState);
    let newFieldErrorMessage = formState.errors[name]?.message;
    if (newFieldErrorMessage === undefined) {
      newFieldErrorMessage = "";
    }
    console.log("manual newFieldErrorMessage:", newFieldErrorMessage);
    setFieldErrorMessage(newFieldErrorMessage);
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

