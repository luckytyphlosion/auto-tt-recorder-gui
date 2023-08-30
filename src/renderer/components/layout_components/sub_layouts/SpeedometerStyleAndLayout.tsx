import React, { useState, memo } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../../../use-form-context-auto-tt";
import useRenderCounter from "../../../RenderCounter";

import { SpeedometerMetricInput } from "../../form_components/SpeedometerMetricInput";
import { SpeedometerDecimalPlacesInput } from "../../form_components/SpeedometerDecimalPlacesInput";
import { makeReadonlyArraySet, ValidValues } from "../../../../shared/array-set";
import { FieldsetOr } from "../../reusable_components/FieldsetOr";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../../generic_components/DeselectableRadioButton";

const SpeedometerMetricInput_Memo = memo(SpeedometerMetricInput);

export const SPEEDOMETER_STYLES = makeReadonlyArraySet(["fancy", "regular", "standard", "none"] as const);
export type SpeedometerStyle = ValidValues<typeof SPEEDOMETER_STYLES>;
export const SPEEDOMETER_STYLES2 = makeReadonlyArraySet(["fancy", "regular"] as const);

export function SpeedometerStyleAndLayout() {
  const {register, getValues} = useFormContextAutoTT();
  const [speedometerStyle, setSpeedometerStyle] = useState(getValues("speedometer-style"));
  const renderCounter = useRenderCounter(false, "SpeedometerStyleAndLayout");
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  function updateSpeedometerStyle(event?: Event) {
    let speedometerStyleFromForm = getValues("speedometer-style");
    setSpeedometerStyle(speedometerStyleFromForm);
  }

  return (
    <div>
      <FieldsetOr>
        <legend>Speedometer</legend>
        <div className="like-input-group">
          <div className="grid-contents">
            <label className="start-label" htmlFor="speedometer-style">SOM style: </label>
            <div className="start-label-contents">
              <DeselectableRadioButtonGroup name="speedometer-style" blockDisplay={false}>
                <DeselectableRadioButton labelValue="Fancy" id="speedometer-style-fancy" value="fancy" onChange={updateSpeedometerStyle}/>
                <DeselectableRadioButton labelValue="Regular" id="speedometer-style-regular" value="regular" onChange={updateSpeedometerStyle}/>
                <DeselectableRadioButton labelValue="Standard" id="speedometer-style-standard" value="standard" onChange={updateSpeedometerStyle}/>
                <DeselectableRadioButton labelValue="None" id="speedometer-style-none" value="none" onChange={updateSpeedometerStyle}/>
              </DeselectableRadioButtonGroup>
              {renderCounter}
            </div>
          </div>
          {
            speedometerStyle !== "none" ? 
            (<>
              <SpeedometerMetricInput_Memo/>
              {speedometerStyle !== "standard" ?
                <SpeedometerDecimalPlacesInput twoDecimalPlaces={isValueOrFILLMEIsValue(speedometerStyle, "regular")}/>
                : ""}
            </>) : ""
          }
        </div>
      </FieldsetOr>
    </div>
  );
}
