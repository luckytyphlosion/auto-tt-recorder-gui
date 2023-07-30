
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

let y: JSX.Element = <div></div>;

// return a copy of children with every element keeping its original reference except the last DeselectableRadioButton element. for that element, clone it and set isLast to true
function createChildrenWithLastRadioButton_helper(children: React.ReactNode, lastRadioButtonId: string): React.ReactNode {
  return React.Children.map(children, (child => {
    let newChild: React.ReactNode;

    if (!React.isValidElement(child)) {
      newChild = child;
    } else {
      if (child.props.id === lastRadioButtonId) {
        if (child.type === DeselectableRadioButton) {
          //console.log("child.type === DeselectableRadioButton");
        }
        //console.log("found lastRadioButton:", child);
        newChild = React.cloneElement(child as React.ReactElement, {isLast: true});
        
      } else if (child.props.children) {
        newChild = createChildrenWithLastRadioButton_helper(child.props.children, lastRadioButtonId);
      } else {
        //console.log("childless child:", child);
        newChild = child;
      }
    }

    return newChild;
  }));
}

function createChildrenWithLastRadioButton(children: React.ReactNode): React.ReactNode {
  let childrenAsArray: React.ReactNode[] = React.Children.toArray(children);
  const lastRadioButton = childrenAsArray.reverse().find((element: React.ReactNode) => {
    return React.isValidElement(element) && element.type === DeselectableRadioButton;
  });

  //console.log("lastRadioButton:", lastRadioButton);

  if (lastRadioButton === undefined || !React.isValidElement(lastRadioButton)) {
    return children;
  } else {
    return createChildrenWithLastRadioButton_helper(children, lastRadioButton.props.id);
  }
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
  const newChildren: React.ReactNode = useMemo(() => {
    if (props.children !== undefined && props.children !== null) {
      return createChildrenWithLastRadioButton(props.children);
    } else {
      return undefined;
    }
  }, [props.name, props.children]);

  const {register} = useFormContextAutoTT();

  function validateDeselectableRadioButton(value: AutoTTRecConfigFormChoiceArgs[AutoTTRecConfigFormChoiceArgName]): ValidateResult {
    //let realValue: AutoTTRecConfigFormChoiceArgs[AutoTTRecConfigFormChoiceArgName] = getValues(name);
    ///console.log("in validateDeselectableRadioButton: realValue:", realValue);
    if (value === "<FILLME>") {
      return "This input is required.";
    } else {
      return true;
    }
  }

  return (
    <>
      <DeselectableRadioButtonsGroupContext.Provider value={props.name}>
        {newChildren}
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

  function validateDeselectableRadioButton(value: AutoTTRecConfigFormChoiceArgs[AutoTTRecConfigFormChoiceArgName]): ValidateResult {
    //let realValue: AutoTTRecConfigFormChoiceArgs[AutoTTRecConfigFormChoiceArgName] = getValues(name);
    ///console.log("in validateDeselectableRadioButton: realValue:", realValue);
    if (value === null) {
      return "This input is required.";
    } else {
      return true;
    }
  }

  return (
    <>
      <label htmlFor={props.id}>{props.labelValue}</label>
      <input type="radio" id={props.id} value={props.value}
        {...register(name, {
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e);
            if (props.onChange !== undefined) {
              if (e instanceof Event) {
                props.onChange(e);
              } else {
                props.onChange();
              }
            }
          },
          validate: undefined
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
