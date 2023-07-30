
import React, { useState, useEffect, useRef } from 'react';
import { Control, Controller, RefCallBack, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { AutoTTRecConfigFormFields, AutoTTRecConfigFormTriCheckboxFields } from "../AutoTTRecFormFieldsAndArgs";

import useRenderCounter from "../RenderCounter";

interface CustomCheckboxProps {
  name: string;
  control: Control<any>;
  defaultValue?: unknown;
  isIndeterminateEnabled?: boolean;
}

function TriCheckboxInternal(props: {
  value: boolean | "<FILLME>",
  refCallback: RefCallBack,
  onChange: (...event: any[]) => void,
  userOnChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void,
  setValue: UseFormSetValue<AutoTTRecConfigFormFields>,
  getValues: UseFormGetValues<AutoTTRecConfigFormFields>
}) {
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const renderCounter = useRenderCounter(false, "TriCheckboxInternal");
  useEffect(() => {
    //console.log("TriCheckboxInternal checked:", checked);
    console.log("getValues('youtube-settings'):", props.getValues("youtube-settings"));
    console.log("props.value:", props.value);

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
        console.log("e.target.checked:", e.target.checked);
        if (props.userOnChange !== undefined) {
          props.userOnChange(e);
        }
        props.onChange(e);
      }}/>
      {renderCounter}
    </>
  );
}

export function TriCheckbox<K extends keyof AutoTTRecConfigFormTriCheckboxFields>(props: {name: K, onChange?: (event?: React.ChangeEvent<HTMLInputElement>) => void}) {
  const {control, setValue, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "TriCheckbox");
  //const checkboxRef = useRef<HTMLInputElement | null>(null);

  //let [checked, setChecked] = useState<boolean | undefined>(getValues(props.name));
  console.log("TriCheckbox getValues('youtube-settings'):", getValues("youtube-settings"));
  return (
    <>
    <Controller
      name={props.name}
      control={control}
      render={({
        field: {onChange, value, ref}
      }) => (
        <TriCheckboxInternal
          value={value}
          onChange={onChange}
          userOnChange={props.onChange}
          refCallback={ref}
          setValue={setValue}
          getValues={getValues}
        />
      )}
    />
    {renderCounter}
    </>
  );
}
