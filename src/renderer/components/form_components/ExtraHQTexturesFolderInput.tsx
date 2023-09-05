import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT, useWatchAutoTT, isValueOrFILLMEIsValueMaker, useWatchExpandUnselectedChoiceInputs } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { BooleanFILLME } from "../../../shared/shared-types";

import { UseFormRegister, UseFormSetValue, ValidateResult } from "react-hook-form";

import { ClearableReadonlyTextInput } from "../generic_components/ClearableReadonlyTextInput";

import { isFolderReadable } from "../../util-renderer"

import { OpenFileTextInputWithButton } from "../generic_components/OpenFileTextInputWithButton";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function ExtraHQTexturesFolderInput() {
  const {getValues, setError, clearErrors} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "ExtraHQTexturesFolderInput");
  const extraHQTexturesFolderEnable = useWatchAutoTT({name: "extra-hq-textures-folder-enable"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();
  const [extraHQTexturesFolderEnableInvalid, setExtraHQTexturesFolderEnableInvalid] = useState(isValueOrFILLMEIsValue(extraHQTexturesFolderEnable));
  //console.log("extraHQTexturesFolderEnableInvalid:", extraHQTexturesFolderEnableInvalid);
  const rerenderErrorMessageCounter = extraHQTexturesFolderEnableInvalid ? 1 : 0;

  async function validateExtraHQTexturesFolder(value: string): Promise<ValidateResult> {
    return validateExtraHQTexturesFolder_customExtraHQTexturesFolderEnable(value);
  }

  async function validateExtraHQTexturesFolder_customExtraHQTexturesFolderEnable(value: string, extraHQTexturesFolderEnable?: BooleanFILLME): Promise<ValidateResult> {
    if (extraHQTexturesFolderEnable === undefined) {
      extraHQTexturesFolderEnable = getValues("extra-hq-textures-folder-enable");
    }
    //console.log("validateExtraHQTexturesFolder extraHQTexturesFolderEnable:", extraHQTexturesFolderEnable);
    if (extraHQTexturesFolderEnable === "<FILLME>") {
      return `"Add extra HQ Textures" checkbox is required.`;
    } else {
      if (value === "") {
        return "Extra HQ Textures folder is required.";
      } else {
        return isFolderReadable(value);
      }
    }
  }

  async function onExtraHQTexturesFolderEnableChange(value: BooleanFILLME) {
    let validateResult = await validateExtraHQTexturesFolder_customExtraHQTexturesFolderEnable(getValues("extra-hq-textures-folder"), value);
    if (validateResult === true || validateResult === undefined) {
      clearErrors("extra-hq-textures-folder");
    } else {
      const errorMessage = validateResult.toString();
      setError("extra-hq-textures-folder", {type: "custom", message: errorMessage});
    }
    //console.log("onExtraHQTexturesFolderEnableChange extraHQTexturesFolderEnable:", value);
    setExtraHQTexturesFolderEnableInvalid(isValueOrFILLMEIsValue(value));
  }

  const extraHQTexturesFolderEnableOrFILLME = isValueOrFILLMEIsValue(extraHQTexturesFolderEnable, true);

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="extra-hq-textures-folder-enable">Add extra HQ Textures? </label>
      <div className="start-label-contents">
        <TriCheckbox name="extra-hq-textures-folder-enable" nameAsId={true} noErrorMessage={extraHQTexturesFolderEnableOrFILLME} onChange={onExtraHQTexturesFolderEnableChange}/>
        {
          extraHQTexturesFolderEnableOrFILLME ? <>
            <OpenFileTextInputWithButton name="extra-hq-textures-folder" startLabel=" " dialogId="extra-hq-textures" dialogType="open-folder" fileFilters={[]} validate={validateExtraHQTexturesFolder} notInGrid={true} inline={true} notRequired={true} rerenderErrorMessageCounter={rerenderErrorMessageCounter} errorMessageOnBottom={true}/>
          </> : ""
        }

        {renderCounter}
      </div>
    </div>
  );
}

