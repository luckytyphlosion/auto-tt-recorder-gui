import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";

import { UseFormRegister, UseFormSetValue } from "react-hook-form";

import { AutoTTRecConfigFormFields } from "../../AutoTTRecFormFieldsAndArgs";
import { isFolderReadable } from "../../util"

import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function ExtraHQTexturesFolderInput() {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "ExtraHQTexturesFolderInput");
  const extraHQTexturesFolderEnable = useWatchAutoTT({name: "extra-hq-textures-folder-enable"});

  async function queueOpenFolderDialog(event: React.MouseEvent<HTMLButtonElement>) {
    let response = await window.api.openFolderDialog(getValues("extra-hq-textures-folder"), "extra-hq-textures");
    if (response !== "") {
      setValue("extra-hq-textures-folder", response, {shouldTouch: true});
    }
  }

  return (
    <div>
      <label htmlFor="extra-hq-textures-folder-enable">Add extra HQ Textures? </label>
      <input type="checkbox" {...register("extra-hq-textures-folder-enable")}/>
      {
        extraHQTexturesFolderEnable ? <>
          <input type="text" readOnly
            {...register("extra-hq-textures-folder", {required: {
              value: true,
              message: "This input is required."
            }, validate: isFolderReadable})}
          ></input>
          <button onClick={event => {
            queueOpenFolderDialog(event);
          }} type="button">Browse&#8230;</button>
          <SimpleErrorMessage name="extra-hq-textures-folder"/>
        </> : ""
      }

      {renderCounter}
    </div>
  );
}

