
import React, { useState, useRef } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

import { ExtraHQTexturesFolderInput } from "./ExtraHQTexturesFolderInput";
import { DolphinResolution } from "./DolphinResolutionInput";

import useRenderCounter from "../../RenderCounter";

export function HQTexturesInput(props: {isDolphinResolution480p: boolean, dolphinResolutionToggle: boolean}) {
  const {register, getValues, setValue} = useFormContextAutoTT();
  const [hqTexturesEnabled, setHqTexturesEnabled] = useState(getValues("hq-textures"));
  //const dolphinResolutionToggleRef = useRef(!props.dolphinResolutionToggle);
  const renderCounter = useRenderCounter(false, "HQTexturesInput");
  const [dolphinResolutionToggle, setDolphinResolutionToggle] = useState(props.dolphinResolutionToggle);

  function updateHQTexturesEnabled(event: Event) {
    setHqTexturesEnabled(getValues("hq-textures"));
  }

  if (dolphinResolutionToggle !== props.dolphinResolutionToggle) {
    setValue("hq-textures", !props.isDolphinResolution480p, {shouldTouch: true});
    setHqTexturesEnabled(!props.isDolphinResolution480p);
    console.log("dolphinResolutionToggleRef.current:", dolphinResolutionToggle);
    setDolphinResolutionToggle(props.dolphinResolutionToggle);
  }

  return (
    <div>
      <label htmlFor="hq-textures">HQ Textures: </label>
      <input type="checkbox" {...register("hq-textures", {onChange: updateHQTexturesEnabled})}/>
      {renderCounter}
      {
        hqTexturesEnabled ? <ExtraHQTexturesFolderInput/> : ""
      }
    </div>
  );
}
