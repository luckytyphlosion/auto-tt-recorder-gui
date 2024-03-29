import React, { useState } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { ChadsoftGhostPageInput } from "./ChadsoftGhostPageInput";
import { MainGhostFilenameInput } from "./MainGhostFilenameInput";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";

export const MAIN_GHOST_SOURCES = makeReadonlyArraySet(["chadsoft", "rkg"] as const);
export type MainGhostSource = ValidValues<typeof MAIN_GHOST_SOURCES>;

export function MainGhostSourceInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [mainGhostSource, setMainGhostSource] = useState(getValues("main-ghost-source"));
  const renderCounter = useRenderCounter(false, "MainGhostSourceInput");
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker("MainGhostSourceInput");

  function updateMainGhostSource(event?: Event) {
    setMainGhostSource(getValues("main-ghost-source"));
  }

  //console.log("mainGhostSource:", mainGhostSource);

  return (
    <div className="grid-contents">
      <label className="start-label">Record from: </label>        
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="main-ghost-source" blockDisplay={false} errorBelow={true}>
          <DeselectableRadioButton labelValue="Chadsoft link: " id="main-ghost-source-chadsoft" value="chadsoft" onChange={updateMainGhostSource}/>
          <DeselectableRadioButton labelValue="RKG: " id="main-ghost-source-rkg" value="rkg" onChange={updateMainGhostSource}/>
        </DeselectableRadioButtonGroup>
        {renderCounter}
      </div>
      {
        isValueOrFILLMEIsValue(mainGhostSource, "chadsoft") ? <ChadsoftGhostPageInput/> : ""
      }
      {
        isValueOrFILLMEIsValue(mainGhostSource, "rkg") ? <MainGhostFilenameInput/> : ""
      }
    </div>
  );
}
