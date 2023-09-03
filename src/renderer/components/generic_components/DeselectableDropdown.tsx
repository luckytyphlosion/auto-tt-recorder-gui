
import React, { memo, useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import { ValidateResult, Control, Controller, RefCallBack, UseFormSetValue, UseFormGetValues, useFormContext } from 'react-hook-form';
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormChoiceArgValue, AutoTTRecConfigFormFieldName } from "../../auto-tt-rec-form-field-types";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";

import useRenderCounter from "../../RenderCounter";

export type SetDropdownErrorState = (fieldNameForError: AutoTTRecConfigFormFieldName, validateResult: ValidateResult) => void;

export function DeselectableDropdown<K extends AutoTTRecConfigFormChoiceArgName>(props: {
  name: K,
  noErrorMessage?: boolean,
  mixedErrorMessageInfo?: {
    validate: (value: AutoTTRecConfigFormChoiceArgValue) => Promise<ValidateResult>,
    liveValidateCallback: (setDropdownErrorState: SetDropdownErrorState) => Promise<void>
  },
  onChange?: ((event?: Event) => void) | (() => void), nameAsId?: boolean, children?: React.ReactNode}) {
  const {register, setValue, getValues, getFieldState, setError, clearErrors, trigger} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, `DeselectableDropdown ${props.name}`);  
  const [invalidForForceRerender, setInvalidForForceRerender] = useState(getFieldState(props.name).invalid);
  const [errorMessageForRerender, setErrorMessageForRerender] = useState<string | undefined>(getFieldState(props.name)?.error?.message);
  const fieldState = getFieldState(props.name);
  const inputTouchedOrInvalid = fieldState.isTouched || fieldState.invalid;
  const chosenValidationCallback = props.mixedErrorMessageInfo !== undefined ? props.mixedErrorMessageInfo.validate : validateDeselectableDropdown;

  useEffect(() => {
    if (!inputTouchedOrInvalid) {
      if (props.mixedErrorMessageInfo !== undefined) {
        props.mixedErrorMessageInfo.liveValidateCallback(setDropdownErrorState).then();
      } else {
        let value = getValues(props.name);
        let validateResult = validateDeselectableDropdown(value);
        if (validateResult === true || validateResult === undefined) {
          setInvalidForForceRerender(false);
          clearErrors(props.name);
        } else {
          let errorMessage = validateResult.toString();
          setInvalidForForceRerender(true);
          setError(props.name, {type: "custom", message: errorMessage});
        }
      }
    }
  }, [inputTouchedOrInvalid]);

  function validateDeselectableDropdown(value: AutoTTRecConfigFormChoiceArgValue): ValidateResult {
    if (value === "<FILLME>") {
      return "This input is required.";
    } else {
      return true;
    }
  }

  function setDropdownErrorState(fieldNameForError: AutoTTRecConfigFormFieldName, validateResult: ValidateResult) {
    //console.log(`DeselectableDropdown-${props.name} setDropdownErrorState validateResult:`, validateResult);
    if (validateResult === true || validateResult === undefined) {
      setErrorMessageForRerender(undefined);
      clearErrors(fieldNameForError);
    } else {
      let errorMessage = validateResult.toString();
      setErrorMessageForRerender(errorMessage);
      setError(fieldNameForError, {type: "custom", message: errorMessage});
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
          if (props.mixedErrorMessageInfo !== undefined) {
            await props.mixedErrorMessageInfo.liveValidateCallback(setDropdownErrorState);
          } else {
            clearErrors(props.name);
            setInvalidForForceRerender(false);  
          }
        },
        validate: chosenValidationCallback
      })} onContextMenu={async (e: React.MouseEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const isSubmitting = getValues("is-submitting");
        if (isSubmitting === false || isSubmitting === "<FILLME>") {
          setValue<AutoTTRecConfigFormChoiceArgName>(props.name, "<FILLME>", {shouldTouch: true});
          if (props.mixedErrorMessageInfo !== undefined) {
            await props.mixedErrorMessageInfo.liveValidateCallback(setDropdownErrorState);
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
        }
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
