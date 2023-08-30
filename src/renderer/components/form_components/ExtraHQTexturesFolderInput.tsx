import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT, useWatchAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";

import { UseFormRegister, UseFormSetValue, ValidateResult } from "react-hook-form";

import { ClearableReadonlyTextInput } from "../generic_components/ClearableReadonlyTextInput";

import { isFolderReadable } from "../../util-renderer"

import { OpenFileTextInputWithButton } from "../generic_components/OpenFileTextInputWithButton";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function ExtraHQTexturesFolderInput() {
  const renderCounter = useRenderCounter(false, "ExtraHQTexturesFolderInput");
  const extraHQTexturesFolderEnable = useWatchAutoTT({name: "extra-hq-textures-folder-enable"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  async function validateExtraHQTexturesFolder(value: string): Promise<ValidateResult> {
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

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="extra-hq-textures-folder-enable">Add extra HQ Textures? </label>
      <div className="start-label-contents">
        <TriCheckbox name="extra-hq-textures-folder-enable" nameAsId={true} noErrorMessage={true}/>
        {
          isValueOrFILLMEIsValue(extraHQTexturesFolderEnable, true) ? <>
            <OpenFileTextInputWithButton name="extra-hq-textures-folder" startLabel=" " dialogId="extra-hq-textures" dialogType="open-folder" fileFilters={[]} validate={validateExtraHQTexturesFolder} notInGrid={true} inline={true} notRequired={true}/>
          </> : ""
        }

        {renderCounter}
      </div>
    </div>
  );
}

