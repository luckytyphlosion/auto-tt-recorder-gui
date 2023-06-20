
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

export function SpeedometerMetricInput() {
  const {register} = useFormContext();
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
