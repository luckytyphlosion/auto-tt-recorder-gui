
import React, { memo, useState, useEffect, useRef, createContext, useContext, useMemo } from 'react';
import { ValidateResult, Control, Controller, RefCallBack, UseFormSetValue, UseFormGetValues, useFormContext } from 'react-hook-form';
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormChoiceArgs, AutoTTRecConfigFormFieldName } from "../../auto-tt-rec-form-field-types";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { EmptyGridRow } from "../EmptyGridRow";

import useRenderCounter from "../../RenderCounter";

interface DeselectableRadioButtonsGroupContextType {
  name: AutoTTRecConfigFormChoiceArgName,
  notDeselectable?: boolean,
  blockDisplay?: boolean
  inputRequiredMessage?: string,
  setInvalidForForceRerender: React.Dispatch<React.SetStateAction<boolean>>
}

const DeselectableRadioButtonsGroupContext = createContext<DeselectableRadioButtonsGroupContextType>({
  name: "aspect-ratio-16-by-9",
  notDeselectable: false,
  blockDisplay: false,
  inputRequiredMessage: "This input is required.",
  setInvalidForForceRerender: () => {}
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

export function DeselectableRadioButtonGroup<K extends AutoTTRecConfigFormChoiceArgName>(props: {name: K, noErrorMessage?: boolean, errorBelow?: boolean, notDeselectable?: boolean, inputRequiredMessage?: string, blockDisplay?: boolean, children?: React.ReactNode}) {
  const {register, getFieldState, getValues, setError, clearErrors} = useFormContextAutoTT();
  const fieldState = getFieldState(props.name);
  const [invalidForForceRerender, setInvalidForForceRerender] = useState(fieldState.invalid);
  const inputTouchedOrInvalid = fieldState.isTouched || fieldState.invalid;
  const counterRef = useRef(0);
  counterRef.current = counterRef.current + 1;
  const inputRequiredMessage = props.inputRequiredMessage !== undefined ? props.inputRequiredMessage : "This input is required.";

  useEffect(() => {
    if (!inputTouchedOrInvalid) {
      const value = getValues(props.name);
      const validateResult = validateDeselectableRadioButton(value);
      if (validateResult === true) {
        clearErrors(props.name);
        setInvalidForForceRerender(false);
      } else {
        setError(props.name, {type: "required", message: inputRequiredMessage});
        //console.log(`DeselectableRadioButtonGroup-${props.name} required`);
        setInvalidForForceRerender(true);
      }
      //console.log(`DeselectableRadioButtonGroup-${props.name} isTouched:`, fieldState.isTouched, ", invalid:", fieldState.invalid, ", invalidForForceRerender:", invalidForForceRerender);
    }
  }, [inputTouchedOrInvalid]);

  //console.log(`DeselectableRadioButtonGroup-${props.name} isTouched:`, fieldState.isTouched, ", invalid:", fieldState.invalid, ", invalidForForceRerender:", invalidForForceRerender, ", error:", fieldState.error, ", counterRef.current:", counterRef.current);

  const renderCounter = useRenderCounter(true, `DeselectableRadioButtonGroup ${props.name}`);
  function validateDeselectableRadioButton(value: AutoTTRecConfigFormChoiceArgs[AutoTTRecConfigFormChoiceArgName]): string | true {
    //console.log(`DeselectableRadioButtonGroup-${props.name} validateDeselectableRadioButton value:`, value);
    if (value === "<FILLME>") {
      return inputRequiredMessage;
    } else {
      return true;
    }
  }

  return (
    <>
      <DeselectableRadioButtonsGroupContext.Provider value={{
        name: props.name,
        notDeselectable: props.notDeselectable,
        blockDisplay: props.blockDisplay,
        inputRequiredMessage: inputRequiredMessage,
        setInvalidForForceRerender: setInvalidForForceRerender
      }}>
        {props.children}
        <input type="radio" id={`${props.name}-FILLME`} value="<FILLME>" style={{display: "none"}} {...register(props.name, {
          validate: validateDeselectableRadioButton
        })}/>
      </DeselectableRadioButtonsGroupContext.Provider>
      {
        props.noErrorMessage ? "" : 
          props.errorBelow ? <div className="grid-contents">
            <div className="start-label"></div>
            <div className="start-label-contents">
              <SimpleErrorMessage name={props.name}/>
            </div>
          </div> : <SimpleErrorMessage name={props.name}/>
      }
      {renderCounter}
    </>
  )
}

export function DeselectableRadioButton<K extends AutoTTRecConfigFormChoiceArgName, V extends AutoTTRecConfigFormChoiceArgs[K]>(props: {labelValue: string, id: string, value: V, onChange?: ((event?: Event) => void) | (() => void)}) {
  const {register, setValue, getValues, setError, clearErrors} = useFormContextAutoTT();
  const context = useDeselectableRadioButtonsGroupContext();
  const renderCounter = useRenderCounter(true, `DeselectableRadioButton ${props.value}`);
  const blockDisplay = context.blockDisplay;

  const inputElement = (
    <>
      <input type="radio" id={props.id} value={props.value} className={blockDisplay ? "long-radio-button-group__input" : undefined}
        {...register(context.name, {
          onChange: async (e: Event) => {
            if (props.onChange !== undefined) {
              if (e instanceof Event) {
                props.onChange(e);
              } else {
                props.onChange();
              }
            }
            clearErrors(context.name);
            context.setInvalidForForceRerender(false);
          }
        })}
        {...!context.notDeselectable ? {
            onContextMenu: async (e: React.MouseEvent<HTMLInputElement>) => {
              let curValue = getValues(context.name);
              if (curValue === "<FILLME>") {
                setValue<AutoTTRecConfigFormChoiceArgName>(context.name, props.value as V, {shouldTouch: true});
                clearErrors(context.name);
                context.setInvalidForForceRerender(false);
              } else {
                setValue<AutoTTRecConfigFormChoiceArgName>(context.name, "<FILLME>", {shouldTouch: true});
                setError(context.name, {type: "required", message: context.inputRequiredMessage});
                context.setInvalidForForceRerender(true);
              }
              if (props.onChange !== undefined) {
                if (e instanceof Event) {
                  props.onChange(e);
                } else {
                  props.onChange();
                }
              }
              e.preventDefault();

              //await triggerAndRerender();
              return false;
            }
          } : {}
        }
      ></input>
      
    </>
  );

  let labelValue = props.labelValue;
  if (!blockDisplay) {
     if (!labelValue.trim().endsWith(":")) {
      labelValue = `${labelValue}: `;
    }
  } else {
    if (labelValue.trim().endsWith(":")) {
      const colonIndex = labelValue.lastIndexOf(":");
      labelValue = labelValue.substring(0, colonIndex) + labelValue.substring(colonIndex + 1);
    }
  }

  const labelElement = <label htmlFor={props.id}>{labelValue}</label>;
  
  
  if (blockDisplay) {
    return <div>
      {inputElement}
      {labelElement}
      {renderCounter}
    </div>
  } else {
    return <>
      {labelElement}
      {inputElement}
      {renderCounter}
    </>
  }
}
