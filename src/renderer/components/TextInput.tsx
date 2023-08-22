import React, { useState, useEffect } from "react";
import { useFormContextAutoTT, useTriggerAndRerenderAutoTT } from "../use-form-context-auto-tt";
import { SimpleErrorMessage } from "./SimpleErrorMessage";
import { AutoTTRecConfigFormStringArgName, AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";
import { ValidationRule, Validate } from "react-hook-form";

import useRenderCounter from "../RenderCounter";

export function TextInput<K extends AutoTTRecConfigFormStringArgName>(props: {name: K, startLabel: string, notRequired?: boolean, requiredMessage?: string, pattern?: ValidationRule<RegExp>, validate?: Validate<string, AutoTTRecConfigFormFields>}) {
  const {register} = useFormContextAutoTT();
  const triggerAndRerender = useTriggerAndRerenderAutoTT();

  //console.log("formState.isSubmitted:", formState.isSubmitted);
  const renderCounter = useRenderCounter(false, `${props.name}-Input`);

  async function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    //console.log(e);
    await triggerAndRerender(props.name);
  }

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor={props.name}>{props.startLabel}</label>
      <div className="start-label-contents">
        <input type="text" id={props.name}
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
        <SimpleErrorMessage name={props.name}/>
        {renderCounter}
      </div>
    </div>
  );
}
