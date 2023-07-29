import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { ChadsoftGhostPageInput } from "./ChadsoftGhostPageInput";
import { MainGhostFilenameInput } from "./MainGhostFilenameInput";

import { AutoTTRecConfigFormFields } from "../../../main/AutoTTRecFormFieldsAndArgs";

import { makeReadonlyArraySet, ValidValues } from "../../../array-set";

export const MAIN_GHOST_SOURCES = makeReadonlyArraySet(["chadsoft", "rkg"] as const);
export type MainGhostSource = ValidValues<typeof MAIN_GHOST_SOURCES>;

export function MainGhostSourceInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [mainGhostSource, setMainGhostSource] = useState(getValues("main-ghost-source"));
  const renderCounter = useRenderCounter(true);

  function updateMainGhostSource(event: Event) {
    setMainGhostSource(getValues("main-ghost-source"));
  }

  return (
    <div>
      <label htmlFor="main-ghost-source">Record from: </label>
      <label htmlFor="main-ghost-source-chadsoft">Chadsoft link: </label>
      <input type="radio" id="main-ghost-source-chadsoft" value="chadsoft"
        {...register<"main-ghost-source">("main-ghost-source", {onChange: updateMainGhostSource})}
      ></input>
      <label htmlFor="main-ghost-source-rkg">RKG: </label>
      <input type="radio" id="main-ghost-source-rkg" value="rkg"
        {...register("main-ghost-source", {onChange: updateMainGhostSource})}
      ></input>
      {renderCounter}
      {
        mainGhostSource === "chadsoft" ? <ChadsoftGhostPageInput/>
        : mainGhostSource === "rkg" ? <MainGhostFilenameInput/>
        : ''
      }
    </div>
  );
}
