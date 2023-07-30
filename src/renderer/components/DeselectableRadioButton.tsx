
import React, { memo, useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import { ValidateResult, Control, Controller, RefCallBack, UseFormSetValue, UseFormGetValues, useFormContext } from 'react-hook-form';
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormChoiceArgs } from "../AutoTTRecFormFieldsAndArgs";
import { SimpleErrorMessage } from "./SimpleErrorMessage";

import useRenderCounter from "../RenderCounter";

interface DeselectableRadioButtonsGroupContextType {
  name: AutoTTRecConfigFormChoiceArgName,
  notDeselectable?: boolean
}

const DeselectableRadioButtonsGroupContext = createContext<DeselectableRadioButtonsGroupContextType>({
  name: "aspect-ratio-16-by-9",
  notDeselectable: false
});

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

export function DeselectableRadioButtonGroup<K extends AutoTTRecConfigFormChoiceArgName>(props: {name: K, noErrorMessage?: boolean, notDeselectable?: boolean, children?: React.ReactNode}) {
  const {register} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true, `DeselectableRadioButtonGroup ${props.name}`);
  function validateDeselectableRadioButton(value: AutoTTRecConfigFormChoiceArgs[AutoTTRecConfigFormChoiceArgName]): ValidateResult {
    if (value === "<FILLME>") {
      return "This input is required.";
    } else {
      return true;
    }
  }

  return (
    <>
      <DeselectableRadioButtonsGroupContext.Provider value={{
        name: props.name,
        notDeselectable: props.notDeselectable
      }}>
        {props.children}
        <input type="radio" id={`${props.name}-FILLME`} value="<FILLME>" style={{display: "none"}} {...register(props.name, {
          validate: validateDeselectableRadioButton
        })}/>
      </DeselectableRadioButtonsGroupContext.Provider>
      {
        props.noErrorMessage ? "" : <SimpleErrorMessage name={props.name}/>
      }
      {renderCounter}
    </>
  )
}

export function DeselectableRadioButton<K extends AutoTTRecConfigFormChoiceArgName, V extends AutoTTRecConfigFormChoiceArgs[K]>(props: {labelValue: string, id: string, value: V, onChange?: ((event?: Event) => void) | (() => void), isLast?: boolean}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const context = useDeselectableRadioButtonsGroupContext();
  const renderCounter = useRenderCounter(true, `DeselectableRadioButton ${props.value}`);

  return (
    <>
      <label htmlFor={props.id}>{props.labelValue}</label>
      <input type="radio" id={props.id} value={props.value}
        {...register(context.name, {
          onChange: props.onChange
        })}
        {...!context.notDeselectable ? {
            onContextMenu: (e: React.MouseEvent<HTMLInputElement>) => {
              let curValue = getValues(context.name);
              if (curValue === "<FILLME>") {
                setValue<AutoTTRecConfigFormChoiceArgName>(context.name, props.value as V, {shouldTouch: true});
              } else {
                setValue<AutoTTRecConfigFormChoiceArgName>(context.name, "<FILLME>", {shouldTouch: true});
              }
              if (props.onChange !== undefined) {
                if (e instanceof Event) {
                  props.onChange(e);
                } else {
                  props.onChange();
                }
              }
              e.preventDefault();
              return false;
            }
          } : {}
        }
      ></input>
      {renderCounter}
    </>
  )
}
