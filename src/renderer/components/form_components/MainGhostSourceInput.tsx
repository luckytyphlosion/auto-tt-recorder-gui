import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

import { ChadsoftGhostPageInput } from "./ChadsoftGhostPageInput";
import { MainGhostFilenameInput } from "./MainGhostFilenameInput";

export function MainGhostSourceInput() {
  const {register, getValues} = useFormContext();
  const [mainGhostSource, setMainGhostSource] = useState(getValues("main-ghost-source"));
  const renderCounter = useRenderCounter();

  function updateMainGhostSource(event: Event) {
    setMainGhostSource(getValues("main-ghost-source"));
  }

  return (
    <div>
      <label htmlFor="main-ghost-source">Record from: </label>
      <label htmlFor="main-ghost-source-chadsoft">Chadsoft link: </label>
      <input type="radio" id="main-ghost-source-chadsoft" value="chadsoft"
        {...register("main-ghost-source", {onChange: updateMainGhostSource})}
      ></input>
      <label htmlFor="main-ghost-source-rkg">RKG: </label>
      <input type="radio" id="main-ghost-source-rkg" value="rkg"
        {...register("main-ghost-source", {onChange: updateMainGhostSource})}
      ></input>
      {renderCounter}
      {
        mainGhostSource === "chadsoft" ? <ChadsoftGhostPageInput/>
        : mainGhostSource === "rkg" ? <MainGhostFilenameInput arg={3}/>
        : ''
      }
    </div>
  );
}
