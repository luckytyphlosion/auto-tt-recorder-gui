import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT, useWatchAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";

import { UseFormRegister, UseFormSetValue, ValidateResult } from "react-hook-form";

import { ClearableReadonlyTextInput } from "../ClearableReadonlyTextInput";

import { isFolderReadable } from "../../util-renderer"

import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { TriCheckbox } from "../TriCheckbox";

export function ExtraHQTexturesFolderInput() {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "ExtraHQTexturesFolderInput");
  const extraHQTexturesFolderEnable = useWatchAutoTT({name: "extra-hq-textures-folder-enable"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  async function queueOpenFolderDialog(event: React.MouseEvent<HTMLButtonElement>) {
    let response = await window.api.openFolderDialog(getValues("extra-hq-textures-folder"), "extra-hq-textures");
    if (response !== "") {
      setValue("extra-hq-textures-folder", response, {shouldTouch: true});
    }
  }

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
            <ClearableReadonlyTextInput name="extra-hq-textures-folder" notRequired={true} validate={validateExtraHQTexturesFolder}/>
            <button type="button" onClick={event => {
              queueOpenFolderDialog(event);
            }}>Browse&#8230;</button>
            <SimpleErrorMessage name="extra-hq-textures-folder"/>
          </> : ""
        }

        {renderCounter}
      </div>
    </div>
  );
}

