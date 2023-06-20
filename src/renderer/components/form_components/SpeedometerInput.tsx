import React, { useState, memo } from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

import { SpeedometerMetricInput } from "./SpeedometerMetricInput";
import { SpeedometerDecimalPlacesInput } from "./SpeedometerDecimalPlacesInput";

const SpeedometerMetricInput_Memo = memo(SpeedometerMetricInput);

export function SpeedometerInput() {
  const {register, getValues} = useFormContext();
  const [speedometerStyle, setSpeedometerStyle] = useState("fancy");
  const renderCounter = useRenderCounter(true);

  function updateSpeedometerStyle(event: Event) {
    let speedometerStyleFromForm = getValues("speedometer-style");
    setSpeedometerStyle(speedometerStyleFromForm);
  }

  return (
    <div>
      <h3>Speedometer</h3>
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
