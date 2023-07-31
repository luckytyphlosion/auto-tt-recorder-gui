
import React, { useState, useEffect, useRef } from 'react';
import { Control, Controller, RefCallBack, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { AutoTTRecConfigFormFields, AutoTTRecConfigFormBooleanArgs } from "../auto-tt-rec-form-field-types";
import { SimpleErrorMessage } from "./SimpleErrorMessage";
import { BooleanFILLME } from "../../shared/shared-types";

import useRenderCounter from "../RenderCounter";

type TriCheckboxUserOnChangeDecl = (newValue: BooleanFILLME) => void;

interface CustomCheckboxProps {
  name: string;
  control: Control<any>;
  defaultValue?: unknown;
  isIndeterminateEnabled?: boolean;
}

function TriCheckboxInternal(props: {
  value: BooleanFILLME,
  refCallback: RefCallBack,
  onChange: (...event: any[]) => void,
  userOnChange?: TriCheckboxUserOnChangeDecl,
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
      <input type="checkbox" ref={(inputRef) => {
        checkboxRef.current = inputRef;
        props.refCallback(inputRef);
      }} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        //console.log("e.target.checked:", e.target.checked);
        if (props.userOnChange !== undefined) {
          props.userOnChange(e.target.checked);
        }
        props.onChange(e);
      }} onContextMenu={(e: React.MouseEvent<HTMLInputElement>) => {
        let newValue: BooleanFILLME = false;
        if (checkboxRef !== null && checkboxRef.current !== null) {
          checkboxRef.current.indeterminate = !checkboxRef.current.indeterminate;
          checkboxRef.current.checked = false;
          newValue = checkboxRef.current.indeterminate ? "<FILLME>" : false;
          //console.log("checkboxRef.current.value:", checkboxRef.current.value);
        }

        if (props.userOnChange !== undefined) {
          props.userOnChange(newValue);
        }
        props.onChange(newValue);
        e.preventDefault();
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
  }
) {
  const {control, setValue, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "TriCheckbox");
  //const checkboxRef = useRef<HTMLInputElement | null>(null);

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
          onChange={onChange}
          userOnChange={props.onChange}
          refCallback={ref}
        />
        
        </span>
      )}
      rules={{
        validate: (value) => {
          //console.log(`TriCheckbox validate ${props.name} value:`, value, ", value2:", value2);
          if (value === true || value === false) {
            return true;
          } else {
            return "This input is required.";
          }
        }
      }}
    />
    {
      props.noErrorMessage ? "" : <SimpleErrorMessage name={props.name}/>
    }
    {renderCounter}
    </>
  );
}
