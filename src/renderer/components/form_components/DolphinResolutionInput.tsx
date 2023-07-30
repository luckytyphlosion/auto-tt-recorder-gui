import React, { useState, memo } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";
import { OutputWidthInput } from "./OutputWidthInput";
import { FormComplexity } from "../layout_components/FormComplexityLayout";
import { HQTexturesInput } from "./HQTexturesInput";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableDropdown } from "../DeselectableDropdown";

export const DOLPHIN_RESOLUTIONS = makeReadonlyArraySet(["2160p", "1440p", "1080p", "720p", "480p"] as const);
export type DolphinResolution = ValidValues<typeof DOLPHIN_RESOLUTIONS>;
/*
function areHQTexturesInputPropsEqual(oldProps: React.ComponentProps<typeof HQTexturesInput>, newProps: React.ComponentProps<typeof HQTexturesInput>) {
  console.log("oldProps.isDolphinResolution480p:", oldProps.isDolphinResolution480p,
    ", newProps.isDolphinResolution480p:", newProps.isDolphinResolution480p,
    ", oldProps.dolphinResolutionToggle:", oldProps.dolphinResolutionToggle,
    ", newProps.dolphinResolutionToggle:", newProps.dolphinResolutionToggle);
  return oldProps.isDolphinResolution480p === newProps.isDolphinResolution480p;
}*/

const HQTexturesInput_memo = memo(HQTexturesInput);

export function DolphinResolutionInput(props: {enableOutputWidth: boolean, formComplexity: FormComplexity}) {
  const {register, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);
  const [dolphinResolution, setDolphinResolution] = useState(getValues("dolphin-resolution"));
  const [dolphinResolutionToggle, setDolphinResolutionToggle] = useState(false);

  function updateDolphinResolution(event?: Event) {
    let dolphinResolutionFormValue = getValues("dolphin-resolution");
    setDolphinResolution(dolphinResolutionFormValue);
    if (dolphinResolutionFormValue !== "<FILLME>") {
      setDolphinResolutionToggle((dolphinResolutionToggle) => !dolphinResolutionToggle);
    }
  }

  return (
    <div>
      <label htmlFor="dolphin-resolution">Dolphin resolution: </label>
      <DeselectableDropdown name="dolphin-resolution" onChange={updateDolphinResolution}>
        <option value="2160p">2160p (4K)</option>
        <option value="1440p">1440p (2K)</option>
        <option value="1080p">1080p</option>
        <option value="720p">720p</option>
        <option value="480p">480p</option>
      </DeselectableDropdown>
      {renderCounter}
      {props.enableOutputWidth ? 
        <OutputWidthInput dolphinResolution={dolphinResolution} dolphinResolutionToggle={dolphinResolutionToggle}/> : ""
      }
      {props.formComplexity > FormComplexity.SIMPLE ?
        <HQTexturesInput_memo isDolphinResolution480p={dolphinResolution === "480p"} dolphinResolutionToggle={dolphinResolutionToggle}/>
        : ""
      }
    </div>
  );
}
