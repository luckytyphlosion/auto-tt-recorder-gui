import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";
import { OutputWidthInput } from "./OutputWidthInput";

import { DolphinResolution } from "../../helper-types";

export function DolphinResolutionInput() {
  const {register, getValues} = useFormContext();
  const renderCounter = useRenderCounter();
  const [dolphinResolution, setDolphinResolution] = useState(getValues("dolphin-resolution"));
  const [dolphinResolutionToggle, setDolphinResolutionToggle] = useState(false);
  const [outputWidthPresetCallback, setOutputWidthPresetCallback] = useState<(dolphinResolution: DolphinResolution) => void>(() => {});

  function dolphinResolutionOutputWidthPresetCallbackReceiver(newOutputWidthPresetCallback: any) {
    setOutputWidthPresetCallback(newOutputWidthPresetCallback);
  }

  function updateDolphinResolution(event: Event) {
    //setDolphinResolution();
    outputWidthPresetCallback(getValues("dolphin-resolution"));
    //setDolphinResolutionToggle(!dolphinResolutionToggle);
  }

  return (
    <div>
      <label htmlFor="dolphin-resolution">Dolphin resolution: </label>
      <select {...register("dolphin-resolution", {
        required: true, onChange: updateDolphinResolution})}>
        <option value="2160p">2160p (4K)</option>
        <option value="1440p">1440p (2K)</option>
        <option value="1080p">1080p</option>
        <option value="720p">720p</option>
        <option value="480p">480p</option>
      </select>
      {renderCounter}
      <OutputWidthInput callbackReceiver={dolphinResolutionOutputWidthPresetCallbackReceiver}/>
    </div>
  );
}
