import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export const SPEEDOMETER_DECIMAL_PLACES_NUMERIC = makeReadonlyArraySet([0, 1, 2] as const);
export type SpeedometerDecimalPlacesNumeric = ValidValues<typeof SPEEDOMETER_DECIMAL_PLACES_NUMERIC>;

export const SPEEDOMETER_DECIMAL_PLACES = makeReadonlyArraySet(["0", "1", "2"] as const);
export type SpeedometerDecimalPlaces = ValidValues<typeof SPEEDOMETER_DECIMAL_PLACES>;

export function SpeedometerDecimalPlacesInput(props: {twoDecimalPlaces: boolean}) {
  const {register, getValues, setValue} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);

  if (!props.twoDecimalPlaces && getValues("speedometer-decimal-places-str") === "2") {
    setValue("speedometer-decimal-places-str", "1", {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="speedometer-decimal-places-str">Decimal places: </label>
      <DeselectableRadioButtonGroup name="speedometer-decimal-places-str">
        <DeselectableRadioButton labelValue="0: " id="speedometer-decimal-places-str-0" value="0"/>
        <DeselectableRadioButton labelValue="1: " id="speedometer-decimal-places-str-1" value="1"/>
        {
          props.twoDecimalPlaces ? (
            <>
              <DeselectableRadioButton labelValue="2: " id="speedometer-decimal-places-str-2" value="2"/>
            </>
          ) : ''
        }
      </DeselectableRadioButtonGroup>

      {renderCounter}
    </div>
  );
}
