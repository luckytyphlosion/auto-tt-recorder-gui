import React, { useState, useMemo, useCallback } from "react";
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { SimpleErrorMessage } from "./SimpleErrorMessage";
import { isFileReadable } from "../util-renderer"
import { ValidationRule, Validate } from "react-hook-form";
import { AutoTTRecConfigFormStringArgName, AutoTTRecConfigFormFields, AutoTTRecConfigFormStringArgs } from "../auto-tt-rec-form-field-types";
import { DialogId } from "../../shared/shared-types";

import { ClearableReadonlyTextInput } from "./ClearableReadonlyTextInput";

export function OpenFileTextInputWithButton<K extends AutoTTRecConfigFormStringArgName>(props: {name: K, startLabel: string, dialogId: DialogId, fileFilters: FileFilter[],
  notInGrid?: boolean,
  noStartLabelClass?: boolean,
  errorMessageOnBottom?: boolean,
  inline?: boolean, notRequired?: boolean, requiredMessage?: string, validate?: Validate<string, AutoTTRecConfigFormStringArgs>}) {
  const {setValue, getValues} = useFormContextAutoTT();

  const queueOpenDialog = useCallback(async function (event: React.MouseEvent<HTMLButtonElement>) {
    let response: string = await window.api.openFileDialog(props.fileFilters, getValues(props.name), props.dialogId);
    if (response !== "") {
      // what type is response expected to be here?
      setValue(props.name, response as any, {shouldTouch: true});
    }
  }, [props.name, props.fileFilters, props.dialogId]);

  const errorMessageElement_memoed = useMemo(() => {
    let errorMessageElement;
    const labelElement = <label htmlFor={props.name} {...props.noStartLabelClass ? {} : {className: "start-label"}}>{props.startLabel}</label>;
    const textInputAndButtonElements = <>
      <ClearableReadonlyTextInput name={props.name} validate={props.validate !== undefined ? props.validate : isFileReadable}/>
      <button type="button" onClick={queueOpenDialog}>Browse&#8230;</button>
    </>

    if (props.errorMessageOnBottom) {
      errorMessageElement = <div className="grid-contents">
        <div className="start-label"></div>
        <div className="start-label-contents">
          <SimpleErrorMessage name={props.name}/>
        </div>
      </div>
    } else {
      errorMessageElement = <SimpleErrorMessage name={props.name}/>;
    }
  
    let resultElementExceptSurroundingNonVoidElement: JSX.Element;
    if (props.notInGrid) {
      resultElementExceptSurroundingNonVoidElement = <>
        {labelElement}
        {textInputAndButtonElements}
        {errorMessageElement}
      </>;
    } else {
      if (props.errorMessageOnBottom) {
        resultElementExceptSurroundingNonVoidElement = <>
          {labelElement}
          <div className="start-label-contents">
            {textInputAndButtonElements}
          </div>
          {errorMessageElement}
        </>;
      } else {
        resultElementExceptSurroundingNonVoidElement = <>
          {labelElement}
          <div className="start-label-contents">
            {textInputAndButtonElements}
            {errorMessageElement}
          </div>        
        </>;
      }
    }
  
    if (props.inline) {
      return resultElementExceptSurroundingNonVoidElement;
    } else {
      if (props.notInGrid) {
        return <div>
          {resultElementExceptSurroundingNonVoidElement}
        </div>;
      } else {
        return <div className="grid-contents">
          {resultElementExceptSurroundingNonVoidElement}
        </div>
      }
    }
  }, [props.name, props.startLabel, props.notInGrid, props.noStartLabelClass, props.errorMessageOnBottom, props.inline]);

  return errorMessageElement_memoed;
}
