import React, { useState, useEffect, useRef } from "react";
import { useFormContextAutoTT, useTriggerAndRerenderAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";
import { AutoTTRecConfigFormStringArgName, AutoTTRecConfigFormFields } from "../../auto-tt-rec-form-field-types";
import { ValidationRule, Validate } from "react-hook-form";

import useRenderCounter from "../../RenderCounter";

export function TextInput<K extends AutoTTRecConfigFormStringArgName>(props: {
  name: K,
  startLabel: string,
  notRequired?: boolean,
  requiredMessage?: string,
  pattern?: ValidationRule<RegExp>,
  validate?: Validate<string, AutoTTRecConfigFormFields>,
  placeholder?: string,
  //formInputNotesStartLabel?: React.ReactNode,
  formInputNotesContents?: React.ReactNode
}) {
  const {register, getFieldState} = useFormContextAutoTT();
  const triggerAndRerender = useTriggerAndRerenderAutoTT(props.name);
  const textInputCounterRef = useRef(0);
  textInputCounterRef.current = textInputCounterRef.current + 1;
  //console.log(`TextInput-${props.name}: ${textInputCounterRef.current}`);
  //console.log("formState.isSubmitted:", formState.isSubmitted);
  const renderCounter = useRenderCounter(false, `${props.name}-TextInput`);
  const fieldState = getFieldState(props.name);
  const inputTouchedOrInvalid = fieldState.isTouched || fieldState.invalid;

  //console.log(`${props.name}-TextInput inputTouchedOrInvalid:`, inputTouchedOrInvalid);

  async function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    //console.log(`TextInput-${props.name} onBlur inputTouchedOrInvalid:`, inputTouchedOrInvalid);
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
        <input type="text" id={props.name} placeholder={props.placeholder}
          {...register(props.name, {
            required: props.notRequired ? false : {
              value: true,
              message: props.requiredMessage !== undefined ? props.requiredMessage : "This input is required."
            },
            onBlur: props.notRequired ? undefined : onBlur,
            pattern: props.pattern,
            validate: props.validate
          })}
        />
        {renderCounter}
      </div>
      <div className="start-label"></div>
      <div className="start-label-contents">
        {props.formInputNotesContents !== undefined ? <p className="form-input-notes">{props.formInputNotesContents}</p> : ""}
        <SimpleErrorMessage name={props.name} marginBlockDisplay={true} negativeTopMargin={props.formInputNotesContents !== undefined}/>
      </div>

    </div>
  );
}
