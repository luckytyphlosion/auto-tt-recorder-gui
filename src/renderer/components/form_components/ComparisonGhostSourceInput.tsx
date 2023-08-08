import React, { useState } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { ChadsoftComparisonGhostPageInput } from "./ChadsoftComparisonGhostPageInput";
import { ComparisonGhostFilenameInput } from "./ComparisonGhostFilenameInput";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const COMPARISON_GHOST_SOURCES = makeReadonlyArraySet(["chadsoft", "rkg", "none"] as const);
export type ComparisonGhostSource = ValidValues<typeof COMPARISON_GHOST_SOURCES>;

export function ComparisonGhostSourceInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [comparisonGhostSource, setComparisonGhostSource] = useState(getValues("comparison-ghost-source"));
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();
  const renderCounter = useRenderCounter(true);

  function updateComparisonGhostSource() {
    console.log("in updateComparisonGhostSource:", getValues("comparison-ghost-source"));
    setComparisonGhostSource(getValues("comparison-ghost-source"));
  }

  return (
    <>
      <div className="start-label-div">
        <label className="start-label">Comparison ghost source: </label>
      </div>
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="comparison-ghost-source">
          <DeselectableRadioButton labelValue="Chadsoft link:" id="comparison-ghost-source-chadsoft" value="chadsoft" onChange={updateComparisonGhostSource}/>
          <DeselectableRadioButton labelValue="RKG:" id="comparison-ghost-source-rkg" value="rkg" onChange={updateComparisonGhostSource}/>
          <DeselectableRadioButton labelValue="None:" id="comparison-ghost-source-none" value="none" onChange={updateComparisonGhostSource}/>
        </DeselectableRadioButtonGroup>
      </div>
      {renderCounter}
      {
        isValueOrFILLMEIsValue(comparisonGhostSource, "chadsoft") ? <ChadsoftComparisonGhostPageInput/> : ""
      }
      {
        isValueOrFILLMEIsValue(comparisonGhostSource, "rkg") ? <ComparisonGhostFilenameInput/> : ""
      }
    </>
  );
}
