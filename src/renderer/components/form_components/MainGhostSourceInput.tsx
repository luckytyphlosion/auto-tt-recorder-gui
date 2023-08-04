import React, { useState } from "react";
import { useFormContextAutoTT, isValueOrFillmeIsValueMaker } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { ChadsoftGhostPageInput } from "./ChadsoftGhostPageInput";
import { MainGhostFilenameInput } from "./MainGhostFilenameInput";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export const MAIN_GHOST_SOURCES = makeReadonlyArraySet(["chadsoft", "rkg"] as const);
export type MainGhostSource = ValidValues<typeof MAIN_GHOST_SOURCES>;

export function MainGhostSourceInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [mainGhostSource, setMainGhostSource] = useState(getValues("main-ghost-source"));
  const renderCounter = useRenderCounter(false, "MainGhostSourceInput");
  const isValueOrFillmeIsValue = isValueOrFillmeIsValueMaker();

  function updateMainGhostSource(event?: Event) {
    setMainGhostSource(getValues("main-ghost-source"));
  }

  return (
    <div>
      <label htmlFor="main-ghost-source">Record from: </label>
      <DeselectableRadioButtonGroup name="main-ghost-source">
       <DeselectableRadioButton labelValue="Chadsoft link: " id="main-ghost-source-chadsoft" value="chadsoft" onChange={updateMainGhostSource}/>
        <DeselectableRadioButton labelValue="RKG: " id="main-ghost-source-rkg" value="rkg" onChange={updateMainGhostSource}/>
      </DeselectableRadioButtonGroup>
      {renderCounter}
      {
        isValueOrFillmeIsValue(mainGhostSource, "chadsoft") ? <ChadsoftGhostPageInput/> : ""
      }
      {
        isValueOrFillmeIsValue(mainGhostSource, "rkg") ? <MainGhostFilenameInput/> : ""
      }
    </div>
  );
}
