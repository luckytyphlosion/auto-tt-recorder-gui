import React, { useState, memo } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { SpeedometerMetricInput } from "./SpeedometerMetricInput";
import { SpeedometerDecimalPlacesInput } from "./SpeedometerDecimalPlacesInput";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

const SpeedometerMetricInput_Memo = memo(SpeedometerMetricInput);

export const SPEEDOMETER_STYLES = makeReadonlyArraySet(["fancy", "regular", "standard", "none"] as const);
export type SpeedometerStyle = ValidValues<typeof SPEEDOMETER_STYLES>;
export const SPEEDOMETER_STYLES2 = makeReadonlyArraySet(["fancy", "regular"] as const);

export function SpeedometerInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [speedometerStyle, setSpeedometerStyle] = useState("fancy");
  const renderCounter = useRenderCounter(false, "SpeedometerInput");

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
