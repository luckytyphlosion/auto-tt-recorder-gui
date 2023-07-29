
import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";
import { makeReadonlyArraySet, ValidValues } from "../../../array-set";

export const SPEEDOMETER_METRICS = makeReadonlyArraySet(["engine", "xz", "xyz"] as const);
export type SpeedometerMetric = ValidValues<typeof SPEEDOMETER_METRICS>;

export function SpeedometerMetricInput() {
  const {register} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);

  return (
    <div>
      <label htmlFor="speedometer-metric">Metric: </label>
      <label htmlFor="speedometer-metric-engine">Engine: </label>
      <input type="radio" id="speedometer-metric-engine" value="engine"
        {...register("speedometer-metric")}
      ></input>
      <label htmlFor="speedometer-metric-xz">XZ: </label>
      <input type="radio" id="speedometer-metric-xz" value="xz"
        {...register("speedometer-metric")}
      ></input>
      <label htmlFor="speedometer-metric-xyz">XYZ: </label>
      <input type="radio" id="speedometer-metric-xyz" value="xyz"
        {...register("speedometer-metric")}
      ></input>
      {renderCounter}
    </div>
  );
}
