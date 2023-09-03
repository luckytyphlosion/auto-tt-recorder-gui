
import React, { useState, useEffect, useRef } from 'react';
import { Control, Controller, RefCallBack, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { AutoTTRecConfigFormFields, AutoTTRecConfigFormBooleanArgs } from "../../auto-tt-rec-form-field-types";
import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";
import { BooleanFILLME } from "../../../shared/shared-types";

import useRenderCounter from "../../RenderCounter";

type TriCheckboxUserOnChangeDecl = (newValue: BooleanFILLME) => Promise<void>;

interface CustomCheckboxProps {
  name: string;
  control: Control<any>;
  defaultValue?: unknown;
  isIndeterminateEnabled?: boolean;
}

function TriCheckboxInternal(props: {
  value: BooleanFILLME,
  refCallback: RefCallBack,
  disableRightClickCallback: () => boolean,
  onChange: (...event: any[]) => void,
  userOnChange?: TriCheckboxUserOnChangeDecl,
  id?: string
}) {
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const renderCounter = useRenderCounter(true, "TriCheckboxInternal");
  useEffect(() => {
    //console.log("TriCheckboxInternal checked:", checked);
    //console.log("props.value:", props.value);

    if (checkboxRef !== null && checkboxRef.current !== null) {
      if (props.value === true || props.value === false) {
        checkboxRef.current.indeterminate = false;
        checkboxRef.current.checked = props.value;
      } else {
        checkboxRef.current.indeterminate = true;
        checkboxRef.current.checked = false;
      }
    }
  }, [props.value]);

  return (
    <>
      <input type="checkbox" id={props.id} ref={(inputRef) => {
        checkboxRef.current = inputRef;
        props.refCallback(inputRef);
      }} onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log("e.target.checked:", e.target.checked);
        if (props.userOnChange !== undefined) {
          await props.userOnChange(e.target.checked);
        }
        props.onChange(e);
      }} onContextMenu={async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (props.disableRightClickCallback()) {
          return false;
        }
        let newValue: BooleanFILLME = false;
        if (checkboxRef !== null && checkboxRef.current !== null) {
          checkboxRef.current.indeterminate = !checkboxRef.current.indeterminate;
          checkboxRef.current.checked = false;
          newValue = checkboxRef.current.indeterminate ? "<FILLME>" : false;
          //console.log("checkboxRef.current.value:", checkboxRef.current.value);
        }

        if (props.userOnChange !== undefined) {
          await props.userOnChange(newValue);
        }
        props.onChange(newValue);
        return false;
      }}
      />
      {renderCounter}
    </>
  );
}

export function TriCheckbox<K extends keyof AutoTTRecConfigFormBooleanArgs>(
  props: {
    name: K,
    onChange?: TriCheckboxUserOnChangeDecl,
    noErrorMessage?: boolean
    nameAsId?: boolean
  }
) {
  const {control, setValue, getValues, getFieldState, setError, clearErrors} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, `TriCheckbox-${props.name}`);
  //const checkboxRef = useRef<HTMLInputElement | null>(null);
  const fieldState = getFieldState(props.name);
  const [invalidForForceRerender, setInvalidForForceRerender] = useState(fieldState.invalid);
  const inputTouchedOrInvalid = fieldState.isTouched || fieldState.invalid;

  function validateTriCheckbox(value: BooleanFILLME) {
    if (value === true || value === false) {
      return true;
    } else {
      return "This input is required.";
    }
  }

  function validateTriCheckboxAndSetErrorState(value: BooleanFILLME) {
    const validateResult = validateTriCheckbox(value);
    if (validateResult === true) {
      clearErrors(props.name);
      setInvalidForForceRerender(false);
    } else {
      setError(props.name, {type: "required", message: validateResult});
      //console.log(`TriCheckbox-${props.name} required`);
      setInvalidForForceRerender(true);
    }
  }

  useEffect(() => {
    if (!inputTouchedOrInvalid) {
      const value = getValues(props.name);
      validateTriCheckboxAndSetErrorState(value);
      //console.log(`TriCheckbox-${props.name} isTouched:`, fieldState.isTouched, ", invalid:", fieldState.invalid, ", invalidForForceRerender:", invalidForForceRerender);
    }
  }, [inputTouchedOrInvalid]);

  //let [checked, setChecked] = useState<boolean | undefined>(getValues(props.name));
  //console.log(`TriCheckbox ${props.name}:`, getValues(props.name));
  return (
    <>
    <Controller
      name={props.name}
      control={control}
      render={({
        field: {onChange, value, ref}
      }) => (
        <span>
        <TriCheckboxInternal
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement> | BooleanFILLME) => {
            onChange(e);
            let newValue: BooleanFILLME;
            if (typeof e === "boolean" || e === "<FILLME>") {
              newValue = e;
            } else {
              newValue = e.target.checked;
            }
            validateTriCheckboxAndSetErrorState(newValue);
          }}
          disableRightClickCallback={() => {
            return getValues("is-submitting") === true;
          }}
          userOnChange={props.onChange}
          refCallback={ref}
          id={props.nameAsId ? props.name : undefined}
        />
        
        </span>
      )}
      rules={{
        validate: validateTriCheckbox
      }}
    />
    {
      props.noErrorMessage ? "" : <SimpleErrorMessage name={props.name}/>
    }
    {renderCounter}
    </>
  );
}
