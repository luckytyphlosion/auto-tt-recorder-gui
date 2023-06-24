import React, { useState, memo } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { SpeedometerMetricInput } from "./SpeedometerMetricInput";
import { SpeedometerDecimalPlacesInput } from "./SpeedometerDecimalPlacesInput";

const SpeedometerMetricInput_Memo = memo(SpeedometerMetricInput);

export function AdvancedTimelineFullInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [speedometerStyle, setSpeedometerStyle] = useState("fancy");
  const renderCounter = useRenderCounter();

  function updateSpeedometerStyle(event: Event) {
    let speedometerStyleFromForm = getValues("speedometer-style");
    setSpeedometerStyle(speedometerStyleFromForm);
  }

  return (
    <div>
      <label htmlFor="speedometer-style">Style: </label>
      <label htmlFor="speedometer-style-fancy">Fancy: </label>
      <input type="radio" id="speedometer-style-fancy" value="fancy"
        {...register("speedometer-style", {onChange: updateSpeedometerStyle})}
      ></input>
      <label htmlFor="speedometer-style-regular">Regular: </label>
      <input type="radio" id="speedometer-style-regular" value="regular"
        {...register("speedometer-style", {onChange: updateSpeedometerStyle})}
      ></input>
      <label htmlFor="speedometer-style-standard">Standard: </label>
      <input type="radio" id="speedometer-style-standard" value="standard"
        {...register("speedometer-style", {onChange: updateSpeedometerStyle})}
      ></input>
      <label htmlFor="speedometer-style-none">None: </label>
      <input type="radio" id="speedometer-style-none" value="none"
        {...register("speedometer-style", {onChange: updateSpeedometerStyle})}
      ></input>
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
