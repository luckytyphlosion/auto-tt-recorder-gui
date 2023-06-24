import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

export type SpeedometerDecimalPlaces = "0" | "1" | "2";

export function SpeedometerDecimalPlacesInput(props: {twoDecimalPlaces: boolean}) {
  const {register, getValues, setValue} = useFormContextAutoTT();
  //const [speedometerEnabled, setSpeedometerEnabled] = useState(true);
  const renderCounter = useRenderCounter(true);

  if (!props.twoDecimalPlaces && getValues("speedometer-decimal-places") === "2") {
    setValue("speedometer-decimal-places", "1", {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="speedometer-decimal-places">Decimal places: </label>
      <label htmlFor="speedometer-decimal-places-0">0: </label>
      <input type="radio" id="speedometer-decimal-places-0" value="0"
        {...register("speedometer-decimal-places")}
      ></input>
      <label htmlFor="speedometer-decimal-places-1">1: </label>
      <input type="radio" id="speedometer-decimal-places-1" value="1"
        {...register("speedometer-decimal-places")}
      ></input>
      {
        props.twoDecimalPlaces ? (
          <>
            <label htmlFor="speedometer-decimal-places-2">2: </label>
            <input type="radio" id="speedometer-decimal-places-2" value="2"
              {...register("speedometer-decimal-places")}
            ></input>
          </>
        ) : ''
      }

      {renderCounter}
    </div>
  );
}
