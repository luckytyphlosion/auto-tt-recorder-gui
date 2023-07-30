import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { MusicFilenameInput } from "./MusicFilenameInput";
import { Top10LocationRegionalInput } from "./Top10LocationRegionalInput";
import { OutputWidthCustomInput } from "./OutputWidthCustomInput";
import { DeselectableDropdown } from "../DeselectableDropdown";

import { DolphinResolution } from "./DolphinResolutionInput";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import useRenderCounter from "../../RenderCounter";

export const OUTPUT_WIDTH_PRESETS = makeReadonlyArraySet(["3840", "2560", "1920", "1280", "854", "none", "custom"] as const);
export type OutputWidthPreset = ValidValues<typeof OUTPUT_WIDTH_PRESETS>;

export const recommendedOutputWidths: {[k in DolphinResolution]: OutputWidthPreset} = {
  "2160p": "3840",
  "1440p": "2560",
  "1080p": "1920",
  "720p": "1280",
  "480p": "none",
  "<FILLME>": "<FILLME>"
} as const;

export function OutputWidthInput(props: {dolphinResolution: DolphinResolution, dolphinResolutionToggle: boolean}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const [outputWidthPreset, setOutputWidthPreset] = useState(getValues("output-width-preset"));
  const [dolphinResolutionToggle, setDolphinResolutionToggle] = useState(props.dolphinResolutionToggle);
  const renderCounter = useRenderCounter(false, "OutputWidthInput");

  function updateOutputWidthPreset(event?: Event) {
    setOutputWidthPreset(getValues("output-width-preset"));
  }

  //console.log("props.dolphinResolutionToggle:", props.dolphinResolutionToggle);

  if (dolphinResolutionToggle != props.dolphinResolutionToggle) {
    let newOutputWidthPreset = recommendedOutputWidths[props.dolphinResolution];
    setValue("output-width-preset", newOutputWidthPreset, {shouldTouch: true});
    setOutputWidthPreset(newOutputWidthPreset);
    setDolphinResolutionToggle(props.dolphinResolutionToggle);
  }

  return (
    <div>
      <label htmlFor="output-width-preset">Output video width: </label>
      <DeselectableDropdown name="output-width-preset" onChange={updateOutputWidthPreset}>
        <option value="none">Don't rescale</option>
        <option value="3840">3840 (2160p/4k)</option>
        <option value="2560">2560 (1440p/2k)</option>
        <option value="1920">1920 (1080p)</option>
        <option value="1280">1280 (720p)</option>
        <option value="854">854 (480p)</option>
        <option value="custom">Custom...</option>
      </DeselectableDropdown>
      {renderCounter}
      {
        outputWidthPreset === "custom" || outputWidthPreset === "<FILLME>" ? <OutputWidthCustomInput outputWidthPreset={outputWidthPreset}/> : ""
      }
    </div>
  );
}
