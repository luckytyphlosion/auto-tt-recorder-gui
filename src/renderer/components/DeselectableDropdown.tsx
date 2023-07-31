
import React, { memo, useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import { ValidateResult, Control, Controller, RefCallBack, UseFormSetValue, UseFormGetValues, useFormContext } from 'react-hook-form';
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormChoiceArgs } from "../auto-tt-rec-form-field-types";
import { SimpleErrorMessage } from "./SimpleErrorMessage";

import useRenderCounter from "../RenderCounter";

export function DeselectableDropdown<K extends AutoTTRecConfigFormChoiceArgName>(props: {name: K, noErrorMessage?: boolean, onChange?: ((event?: Event) => void) | (() => void), children?: React.ReactNode}) {
  const {register, setValue} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, `DeselectableDropdown ${props.name}`);
  function validateDeselectableDropdown(value: AutoTTRecConfigFormChoiceArgs[AutoTTRecConfigFormChoiceArgName]): ValidateResult {
    if (value === "<FILLME>") {
      return "This input is required.";
    } else {
      return true;
    }
  }

  return (
    <>
      <select {...register(props.name, {
        onChange: props.onChange,
        validate: validateDeselectableDropdown
      })} onContextMenu={(e: React.MouseEvent<HTMLSelectElement>) => {
        setValue<AutoTTRecConfigFormChoiceArgName>(props.name, "<FILLME>", {shouldTouch: true});
        if (props.onChange !== undefined) {
          if (e instanceof Event) {
            props.onChange(e);
          } else {
            props.onChange();
          }
        }
        e.preventDefault();
      }}>
        {props.children}
        <option value="<FILLME>" disabled style={{display: "none"}}></option>
      </select>
      {
        props.noErrorMessage ? "" : <SimpleErrorMessage name={props.name}/>
      }
      {renderCounter}
    </>
  )
}
