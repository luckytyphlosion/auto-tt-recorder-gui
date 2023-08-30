import React, { useState, useMemo, useEffect } from "react";
import { useFormContextAutoTT, useTriggerAndRerenderAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { isFileReadable, isFileReadableAndHasCorrectExtension } from "../../util-renderer"
import { ValidationRule, Validate } from "react-hook-form";
import { AutoTTRecConfigFormStringArgName, AutoTTRecConfigFormFields, AutoTTRecConfigFormStringArgs } from "../../auto-tt-rec-form-field-types";
import { DialogId } from "../../../shared/shared-types";

import { ClearableReadonlyTextInput } from "./ClearableReadonlyTextInput";

import useRenderCounter from "../../RenderCounter";

function getFileFiltersFromPossibleFunction(fileFilters: FileFilter[] | (() => FileFilter[])): FileFilter[] {
  if (typeof fileFilters === "function") {
    return fileFilters();
  } else {
    return fileFilters;
  }
}

export function OpenFileTextInputWithButton<K extends AutoTTRecConfigFormStringArgName>(props: {
  name: K,
  startLabel: string,
  dialogId: DialogId,
  // optional folder/file dialog specifier, defaults to "open-file"
  dialogType?: "open-file" | "open-folder" | "save-file"
  fileFilters: FileFilter[] | (() => FileFilter[]),
  // optional custom validation function, defaults to isFileReadable
  validate?: Validate<string, AutoTTRecConfigFormStringArgs>
  // layout flags
  notInGrid?: boolean,
  noStartLabelClass?: boolean,
  errorMessageOnBottom?: boolean,
  inline?: boolean,
  // other flags
  notRequired?: boolean,
  rerenderErrorMessageCounter?: number
}) {
  const {setValue, getValues, formState, getFieldState} = useFormContextAutoTT();
  const [rerenderCounter, setRerenderCounter] = useState(0);
  const [asyncRerenderCounter, setAsyncRerenderCounter] = useState(0);
  const fieldState = getFieldState(props.name);
  const inputTouchedOrInvalid = fieldState.isTouched || fieldState.invalid;

  const triggerAndRerender = useTriggerAndRerenderAutoTT(props.name);
  const renderCounter = useRenderCounter(false, `${props.name}-FileInput`);
  const dialogType = props.dialogType !== undefined ? props.dialogType : "open-file";
  let errorMessage = fieldState.error?.message;
  if (errorMessage === undefined) {
    errorMessage = "";
  }

  useEffect(() => {
    if (!inputTouchedOrInvalid) {
      triggerAndRerender(false).then();
    }
  }, [inputTouchedOrInvalid]);

  //console.log()
  async function queueFileFolderDialog(event: React.MouseEvent<HTMLButtonElement>) {
    let response: string = "";
    let fileFilters: FileFilter[] = getFileFiltersFromPossibleFunction(props.fileFilters);

    if (dialogType === "open-file") {
      response = await window.api.openFileDialog(fileFilters, getValues(props.name), props.dialogId);
    } else if (dialogType === "open-folder") {
      response = await window.api.openFolderDialog(getValues(props.name), props.dialogId);
    } else if (dialogType === "save-file") {
      response = await window.api.saveFileDialog(fileFilters, getValues(props.name), props.dialogId);
    }

    if (response !== "") {
      // what type is response expected to be here?
      setValue(props.name, response as any, {shouldTouch: true});
      await triggerAndRerender(true);
      setAsyncRerenderCounter((asyncRerenderCounter) => (asyncRerenderCounter + 1));
    }
  }
  // [props.name, props.dialogId, dialogType, props.fileFilters]

  //console.log(`${props.name}-FileInput formState:`, formState, ", getFieldState errorMessage:", errorMessage);
  async function validateFile(filename: string) {
    let fileFilters: FileFilter[] = getFileFiltersFromPossibleFunction(props.fileFilters);
    let expectedExtensionsMinusDot = fileFilters.reduce((currentExpectedExtensionsMinusDot: string[], currentFileFilter: FileFilter) => {
      currentExpectedExtensionsMinusDot.push(...currentFileFilter.extensions);
      return currentExpectedExtensionsMinusDot;
    }, []);

    return isFileReadableAndHasCorrectExtension(filename, expectedExtensionsMinusDot);
  }

  const errorMessageElement_memoed = useMemo(() => {
    let errorMessageElement;
    const labelElement = props.startLabel !== " " ? (<label htmlFor={props.name} {...props.noStartLabelClass ? {} : {className: "start-label"}}>{props.startLabel}</label>) : "";
    const buttonText = props.dialogType !== "save-file" ? "Browse\u2026" : "Export as\u2026";
    const textInputAndButtonElements = <>
      <ClearableReadonlyTextInput
        name={props.name}
        validate={props.validate !== undefined ? props.validate : validateFile}
        notRequired={props.notRequired}
        parentRerenderSetState={setRerenderCounter}
      />
      <button type="button" onClick={queueFileFolderDialog}>{buttonText}</button>
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
        {renderCounter}
      </>;
    } else {
      if (props.errorMessageOnBottom) {
        resultElementExceptSurroundingNonVoidElement = <>
          {labelElement}
          <div className="start-label-contents">
            {textInputAndButtonElements}
            {renderCounter}
          </div>
          {errorMessageElement}
        </>;
      } else {
        resultElementExceptSurroundingNonVoidElement = <>
          {labelElement}
          <div className="start-label-contents">
            {textInputAndButtonElements}
            {errorMessageElement}
            {renderCounter}
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
  }, [props.name, props.startLabel, props.dialogType, props.validate, props.notInGrid, props.noStartLabelClass, props.errorMessageOnBottom, props.inline, props.notRequired, errorMessage, rerenderCounter, asyncRerenderCounter, props.rerenderErrorMessageCounter]);

  return errorMessageElement_memoed;
}
