
import React, { memo, useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import { Validate } from 'react-hook-form';
import { useFormContextAutoTT, useTriggerAndRerenderAutoTT } from "../../use-form-context-auto-tt";
import { AutoTTRecConfigFormStringArgName, AutoTTRecConfigFormFields } from "../../auto-tt-rec-form-field-types";

import useRenderCounter from "../../RenderCounter";

export function ClearableReadonlyTextInput<K extends AutoTTRecConfigFormStringArgName>(props: {name: K, notRequired?: boolean, validate: Validate<string, AutoTTRecConfigFormFields>, setState?: (value: string) => void, className?: string, parentRerenderSetState?: React.Dispatch<React.SetStateAction<number>>}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const triggerAndRerender = useTriggerAndRerenderAutoTT(props.name);
  const renderCounter = useRenderCounter(false, `ClearableReadonlyTextInput ${props.name}`);

  return (
    <>
      <input type="text" readOnly className={props.className}
      {...register(props.name, {required: !props.notRequired ? {
        value: true,
        message: "This input is required."
      } : false, validate: props.validate})}
      onContextMenu={async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const isSubmitting = getValues("is-submitting");
        if (isSubmitting === false || isSubmitting === "<FILLME>") {
          setValue<AutoTTRecConfigFormStringArgName>(props.name, "", {shouldTouch: true});
          if (props.setState !== undefined) {
            props.setState("");
          }
          await triggerAndRerender(true);
          if (props.parentRerenderSetState !== undefined) {
            props.parentRerenderSetState((oldValue) => (oldValue + 1));
          }
        }
      }}
      ></input>
      {renderCounter}
    </>
  )
}
