
import React, { memo, useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import { ValidateResult, Control, Controller, RefCallBack, UseFormSetValue, UseFormGetValues, useFormContext } from 'react-hook-form';
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormChoiceArgs } from "../auto-tt-rec-form-field-types";
import { SimpleErrorMessage } from "./SimpleErrorMessage";

import useRenderCounter from "../RenderCounter";

export function DeselectableDropdown<K extends AutoTTRecConfigFormChoiceArgName>(props: {
  name: K,
  noErrorMessage?: boolean,
  customValidate?: (value: AutoTTRecConfigFormChoiceArgs[AutoTTRecConfigFormChoiceArgName]) => Promise<ValidateResult>,
  onChange?: ((event?: Event) => void) | (() => void), nameAsId?: boolean, children?: React.ReactNode}) {
  const {register, setValue, getValues, getFieldState, setError, clearErrors} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, `DeselectableDropdown ${props.name}`);
  const [invalidForForceRerender, setInvalidForForceRerender] = useState(getFieldState(props.name).invalid);
  const [errorMessageForRerender, setErrorMessageForRerender] = useState<string | undefined>(getFieldState(props.name)?.error?.message);

  function validateDeselectableDropdown(value: AutoTTRecConfigFormChoiceArgs[AutoTTRecConfigFormChoiceArgName]): ValidateResult {
    if (value === "<FILLME>") {
      return "This input is required.";
    } else {
      return true;
    }
  }

  async function handleCustomValidateLiveValidation() {
    if (props.customValidate === undefined) {
      return;
    }

    let customValidateResult = await props.customValidate(getValues(props.name));
    console.log(`DeselectableDropdown-${props.name} handleCustomValidateLiveValidation customValidateResult:`, customValidateResult);
    if (customValidateResult === true || customValidateResult === undefined) {
      setErrorMessageForRerender(undefined);
      clearErrors(props.name);
    } else {
      let errorMessage = customValidateResult.toString();
      setErrorMessageForRerender(errorMessage);
      setError(props.name, {type: "custom", message: errorMessage});
    }
  }

  return (
    <>
      <select id={props.nameAsId ? props.name : undefined} {...register(props.name, {
        onChange: async (e: Event) => {
          if (props.onChange !== undefined) {
            if (e instanceof Event) {
              props.onChange(e);
            } else {
              props.onChange();
            }
          }
          if (props.customValidate !== undefined) {
            await handleCustomValidateLiveValidation();
          } else {
            clearErrors(props.name);
            setInvalidForForceRerender(false);  
          }
        },
        validate: props.customValidate !== undefined ? props.customValidate : validateDeselectableDropdown
      })} onContextMenu={async (e: React.MouseEvent<HTMLSelectElement>) => {
        setValue<AutoTTRecConfigFormChoiceArgName>(props.name, "<FILLME>", {shouldTouch: true});
        if (props.customValidate !== undefined) {
          await handleCustomValidateLiveValidation();
        } else {
          setError(props.name, {type: "custom", message: "This input is required."});
          setInvalidForForceRerender(true);
        }
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
