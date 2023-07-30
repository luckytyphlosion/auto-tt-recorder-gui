
import React, { useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import { ValidateResult, Control, Controller, RefCallBack, UseFormSetValue, UseFormGetValues, useFormContext } from 'react-hook-form';
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormChoiceArgs } from "../AutoTTRecFormFieldsAndArgs";
import { SimpleErrorMessage } from "./SimpleErrorMessage";

import useRenderCounter from "../RenderCounter";

const DeselectableRadioButtonsGroupContext = createContext<AutoTTRecConfigFormChoiceArgName>("aspect-ratio-16-by-9");

function useDeselectableRadioButtonsGroupContext() {
  return useContext(DeselectableRadioButtonsGroupContext);
}

/*
  let lastElement = null;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === elementType) {
        lastElement = child;
      } else {
        let potentialLastElement = recursiveFindLastElement(child.props.children, elementType);
        if (potentialLastElement !== null) {
          lastElement = potentialLastElement;
        }
      }
    }
  });
  return lastElement;
}*/

export function DeselectableRadioButtonGroup<K extends AutoTTRecConfigFormChoiceArgName>(props: {name: K, children?: React.ReactNode}) {
  const {register} = useFormContextAutoTT();

  function validateDeselectableRadioButton(value: AutoTTRecConfigFormChoiceArgs[AutoTTRecConfigFormChoiceArgName]): ValidateResult {
    if (value === "<FILLME>") {
      return "This input is required.";
    } else {
      return true;
    }
  }

  return (
    <>
      <DeselectableRadioButtonsGroupContext.Provider value={props.name}>
        {props.children}
        <input type="radio" id={`${props.name}-FILLME`} value="<FILLME>" style={{display: "none"}} {...register(props.name, {
          validate: validateDeselectableRadioButton
        })}/>
      </DeselectableRadioButtonsGroupContext.Provider>
      <SimpleErrorMessage name={props.name}/>
    </>
  )
}

export function DeselectableRadioButton<K extends AutoTTRecConfigFormChoiceArgName, V extends AutoTTRecConfigFormChoiceArgs[K]>(props: {labelValue: string, id: string, value: V, onChange?: ((event?: Event) => void) | (() => void), isLast?: boolean}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const name = useDeselectableRadioButtonsGroupContext();

  return (
    <>
      <label htmlFor={props.id}>{props.labelValue}</label>
      <input type="radio" id={props.id} value={props.value}
        {...register(name, {
          onChange: props.onChange
        })}
        onContextMenu={(e: React.MouseEvent<HTMLInputElement>) => {
          setValue<AutoTTRecConfigFormChoiceArgName>(name, "<FILLME>", {shouldTouch: true});
          if (props.onChange !== undefined) {
            if (e instanceof Event) {
              props.onChange(e);
            } else {
              props.onChange();
            }
          }
          e.preventDefault();
          return false;
        }}
      ></input>
    </>
  )
}
