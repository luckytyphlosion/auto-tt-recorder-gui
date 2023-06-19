import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

import { ChadsoftComparisonGhostPageInput } from "./ChadsoftComparisonGhostPageInput";
import { ComparisonGhostFilenameInput } from "./ComparisonGhostFilenameInput";

export function ComparisonGhostSourceInput() {
  const {register, getValues} = useFormContext();
  const [comparisonGhostSource, setComparisonGhostSource] = useState(getValues("comparison-ghost-source"));
  const renderCounter = useRenderCounter();

  function updateComparisonGhostSource(event: Event) {
    setComparisonGhostSource(getValues("comparison-ghost-source"));
  }

  return (
    <div>
      <label htmlFor="comparison-ghost-source">Comparison ghost source:</label>
      <label htmlFor="comparison-ghost-source-chadsoft">Chadsoft link:</label>
      <input type="radio" id="comparison-ghost-source-chadsoft" value="chadsoft"
        {...register("comparison-ghost-source", {onChange: updateComparisonGhostSource})}
      ></input>
      <label htmlFor="comparison-ghost-source-rkg">RKG:</label>
      <input type="radio" id="comparison-ghost-source-rkg" value="rkg"
        {...register("comparison-ghost-source", {onChange: updateComparisonGhostSource})}
      ></input>
      <label htmlFor="comparison-ghost-source-none">None:</label>
      <input type="radio" id="comparison-ghost-source-none" value="none"
        {...register("comparison-ghost-source", {onChange: updateComparisonGhostSource})}
      ></input>
      {renderCounter}
      {
        comparisonGhostSource === "chadsoft" ? <ChadsoftComparisonGhostPageInput/>
        : comparisonGhostSource === "rkg" ? <ComparisonGhostFilenameInput/>
        : ''
      }
    </div>
  );
}
