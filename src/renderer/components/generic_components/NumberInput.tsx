import React, { useState, useEffect, useRef } from "react";
import { useFormContextAutoTT, useTriggerAndRerenderAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";
import { AutoTTRecConfigFormNumberArgName, AutoTTRecConfigFormFields } from "../../auto-tt-rec-form-field-types";
import { ValidationRule, Validate, ValidateResult } from "react-hook-form";

import useRenderCounter from "../../RenderCounter";

export function NumberInput<K extends AutoTTRecConfigFormNumberArgName>(props: {name: K, startLabel: string, validate?: (value: number) => ValidateResult, hiddenInputInfo?: {
  name: AutoTTRecConfigFormNumberArgName,
  validate: (value: number) => ValidateResult
}}) {
  const {register, getFieldState} = useFormContextAutoTT();
  const triggerAndRerender = useTriggerAndRerenderAutoTT(props.name);
  //const textInputCounterRef = useRef(0);
  //textInputCounterRef.current = textInputCounterRef.current + 1;
  //console.log(`TextInput-${props.name}: ${textInputCounterRef.current}`);
  //console.log("formState.isSubmitted:", formState.isSubmitted);
  const renderCounter = useRenderCounter(false, `${props.name}-NumberInput`);
  const fieldState = getFieldState(props.name);
  const inputTouchedOrInvalid = fieldState.isTouched || fieldState.invalid;

  //console.log(`${props.name}-TextInput inputTouchedOrInvalid:`, inputTouchedOrInvalid);

  async function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    console.log(`NumberInput-${props.name} onBlur inputTouchedOrInvalid:`, inputTouchedOrInvalid);
    await triggerAndRerender(true);
  }

  useEffect(() => {
    if (!inputTouchedOrInvalid) {
      triggerAndRerender(false).then();
    }
  }, [inputTouchedOrInvalid]);

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor={props.name}>{props.startLabel}</label>
      <div className="start-label-contents">
        
        <input type="text" id={props.name}
          {...register(props.name, {
            required: props.hiddenInputInfo !== undefined ? false : {
              value: true,
              message: "This input is required."
            },
            onBlur: onBlur,
            validate: props.validate
          })}
        />
        <SimpleErrorMessage name={props.name}/>
        {renderCounter}
      </div>
    </div>
  );
}
