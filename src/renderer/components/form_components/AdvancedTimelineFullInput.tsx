import React, { useState, memo } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { SpeedometerMetricInput } from "./SpeedometerMetricInput";
import { SpeedometerDecimalPlacesInput } from "./SpeedometerDecimalPlacesInput";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

const SpeedometerMetricInput_Memo = memo(SpeedometerMetricInput);

export function AdvancedTimelineFullInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [speedometerStyle, setSpeedometerStyle] = useState("fancy");
  const renderCounter = useRenderCounter();

  function updateSpeedometerStyle(event?: Event) {
    let speedometerStyleFromForm = getValues("speedometer-style");
    setSpeedometerStyle(speedometerStyleFromForm);
  }

  return (
    <div>
      <label htmlFor="speedometer-style">Style: </label>
      <DeselectableRadioButtonGroup name="speedometer-style">
        <DeselectableRadioButton labelValue="Fancy: " id="speedometer-style-fancy" value="fancy" onChange={updateSpeedometerStyle}/>
        <DeselectableRadioButton labelValue="Regular: " id="speedometer-style-regular" value="regular" onChange={updateSpeedometerStyle}/>
        <DeselectableRadioButton labelValue="Standard: " id="speedometer-style-standard" value="standard" onChange={updateSpeedometerStyle}/>
        <DeselectableRadioButton labelValue="None: " id="speedometer-style-none" value="none" onChange={updateSpeedometerStyle}/>
      </DeselectableRadioButtonGroup>
      {renderCounter}
      {
        speedometerStyle !== "none" ? 
        (<>
          <SpeedometerMetricInput_Memo/>
          {speedometerStyle !== "standard" ?
            <SpeedometerDecimalPlacesInput twoDecimalPlaces={speedometerStyle === "regular"}/>
            : ""}
        </>) : ""
      }
    </div>
  );
}
