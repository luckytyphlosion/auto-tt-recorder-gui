
import React, { useState, useRef } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";

import { ExtraHQTexturesFolderInput } from "./ExtraHQTexturesFolderInput";
import { DolphinResolution } from "./DolphinResolutionInput";

import { TriCheckbox } from "../generic_components/TriCheckbox";
import { BooleanFILLME } from "../../../shared/shared-types";

import useRenderCounter from "../../RenderCounter";

export function HQTexturesInput(props: {isDolphinResolution480p: boolean, dolphinResolutionToggle: boolean}) {
  const {register, getValues, setValue} = useFormContextAutoTT();
  const [hqTexturesEnabled, setHqTexturesEnabled] = useState(getValues("hq-textures"));
  //const dolphinResolutionToggleRef = useRef(!props.dolphinResolutionToggle);
  const renderCounter = useRenderCounter(false, "HQTexturesInput");
  const [dolphinResolutionToggle, setDolphinResolutionToggle] = useState(props.dolphinResolutionToggle);
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  async function updateHQTexturesEnabled(newValue: BooleanFILLME) {
    setHqTexturesEnabled(newValue);
  }

  if (dolphinResolutionToggle !== props.dolphinResolutionToggle) {
    setValue("hq-textures", !props.isDolphinResolution480p, {shouldTouch: true});
    setHqTexturesEnabled(!props.isDolphinResolution480p);
    console.log("dolphinResolutionToggleRef.current:", dolphinResolutionToggle);
    setDolphinResolutionToggle(props.dolphinResolutionToggle);
  }

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="hq-textures">HQ Textures: </label>
      <div className="start-label-contents">
        <TriCheckbox name="hq-textures" nameAsId={true} onChange={updateHQTexturesEnabled}/>
        {renderCounter}
      </div>
      {
        isValueOrFILLMEIsValue(hqTexturesEnabled, true) ? <ExtraHQTexturesFolderInput/> : ""
      }
    </div>
  );
}
