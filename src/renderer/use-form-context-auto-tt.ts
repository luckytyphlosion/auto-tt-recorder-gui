import { useWatch, useFormContext, UseFormTrigger, FormState, useFormState } from "react-hook-form";
import { useState, useEffect } from "react";
import { undefinedToNullStr } from "../shared/util-shared";

import { globalValidateFormOnOpen } from "./components/AutoTTRecConfigForm";

import { AutoTTRecConfigFormFields, AutoTTRecConfigFormFieldName, AutoTTRecConfigFormBooleanArgName, AutoTTRecConfigFormChoiceArgName } from "./auto-tt-rec-form-field-types";

export function useFormContextAutoTT() {
  return useFormContext<AutoTTRecConfigFormFields>();
}

export function useTriggerAndRerenderAutoTT<K extends keyof AutoTTRecConfigFormFields>(name: K) {
  const [fieldErrorMessage, setFieldErrorMessage] = useState<string>("");
  //const [noErrorMessageTryAgainCounter, setNoErrorMessageTryAgainCounter] = useState(0);
  const [untouchedForceRerenderCounter, setUntouchedForcedRerenderCounter] = useState(0);
  //const formState2 = useFormState<AutoTTRecConfigFormFields>({name: name, exact: true});
  const {trigger, getFieldState, formState} = useFormContextAutoTT();
  //const formState2 = formState;

  //console.log("formState2:", formState2);
  // useEffect(() => {
  //   console.log("Form state errors trigger formState:", formState);
  // }, [noErrorMessageTryAgainCounter]);

  return async function(fromBlurOrChange: boolean) { 
    if (name !== undefined) {
      //console.log(`before trigger ${name} formState:`, formState);
      await trigger(name);
      //console.log("getFieldState:", );
      //let newFieldErrors = formState2.errors[name];
      //console.log("newFieldErrors:", newFieldErrors);
      let fieldState = getFieldState(name);
      let formStateErrorMessage = undefinedToNullStr(formState.errors[name]?.message);
      let newFieldErrorMessage = undefinedToNullStr(fieldState.error?.message); //formState2.errors[name]?.message;
      if (name === "top-10-chadsoft" || name === "comparison-ghost-filename") {
        console.log(`after trigger ${name} formState:`, formState);
        console.log(`useTriggerAndRerender-${name} fieldState:`, fieldState);
        console.log(`useTriggerAndRerender-${name} fieldErrorMessage:`, fieldErrorMessage, "newFieldErrorMessage:", newFieldErrorMessage, ", formStateErrorMessage:", formStateErrorMessage);
      }
      //if (globalValidateFormOnOpen || fieldState.isTouched) {
      setFieldErrorMessage(newFieldErrorMessage);
      if (fromBlurOrChange && !globalValidateFormOnOpen) {
        setUntouchedForcedRerenderCounter(1);
      }
      //}
      //if (fieldState.isTouched) {
      //}
      // if (newFieldErrorMessage === "") {
      //   setNoErrorMessageTryAgainCounter((noErrorMessageTryAgainCounter) => (noErrorMessageTryAgainCounter + 1));
      // }
    }
  }
}

export function lateValidateNumberInputMaker<K extends keyof AutoTTRecConfigFormFields>(blurInputName: K, hiddenInputName?: K) {
  const {getFieldState} = useFormContextAutoTT();
  const triggerAndRerenderName = hiddenInputName !== undefined ? hiddenInputName : blurInputName;
  const triggerAndRerender = useTriggerAndRerenderAutoTT(triggerAndRerenderName);
  //const textInputCounterRef = useRef(0);
  //textInputCounterRef.current = textInputCounterRef.current + 1;
  //console.log(`TextInput-${props.name}: ${textInputCounterRef.current}`);
  //console.log("formState.isSubmitted:", formState.isSubmitted);
  const fieldState = getFieldState(blurInputName);
  const inputTouchedOrInvalid = fieldState.isTouched || fieldState.invalid;

  //console.log(`${props.name}-TextInput inputTouchedOrInvalid:`, inputTouchedOrInvalid);

  const onBlur = async function (e?: React.FocusEvent<HTMLInputElement>) {
    console.log(`NumberInput-${blurInputName} onBlur inputTouchedOrInvalid:`, inputTouchedOrInvalid);
    await triggerAndRerender(true);
  }

  useEffect(() => {
    if (!inputTouchedOrInvalid) {
      triggerAndRerender(false).then();
    }
  }, [inputTouchedOrInvalid]);

  return onBlur;
}

// export async function triggerAndRerenderAutoTT(name: AutoTTRecConfigFormFieldName, trigger: UseFormTrigger<AutoTTRecConfigFormFields>, formState: FormState<AutoTTRecConfigFormFields>, setFieldErrorMessage: React.Dispatch<React.SetStateAction<string>>) {
//   if (name !== undefined) {
//     //console.log(`manual before trigger ${name} formState:`, formState);
//     await trigger(name, {shouldFocus: true});
//     //console.log(`manual after trigger ${name} formState:`, formState);
//     let newFieldErrorMessage = formState.errors[name]?.message;
//     if (newFieldErrorMessage === undefined) {
//       newFieldErrorMessage = "";
//     }
//     //console.log("manual newFieldErrorMessage:", newFieldErrorMessage);
//     setFieldErrorMessage(newFieldErrorMessage);
//   }
// }

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

