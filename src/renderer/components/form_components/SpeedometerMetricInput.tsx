
import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export const SPEEDOMETER_METRICS = makeReadonlyArraySet(["engine", "xz", "xyz"] as const);
export type SpeedometerMetric = ValidValues<typeof SPEEDOMETER_METRICS>;

export function SpeedometerMetricInput() {
  const {register} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);

  return (
    <div>
      <label htmlFor="speedometer-metric">Metric: </label>
      <DeselectableRadioButtonGroup name="speedometer-metric">
        <DeselectableRadioButton labelValue="Engine: " id="speedometer-metric-engine" value="engine"/>
        <DeselectableRadioButton labelValue="XZ: " id="speedometer-metric-xz" value="xz"/>
        <DeselectableRadioButton labelValue="XYZ: " id="speedometer-metric-xyz" value="xyz"/>
      </DeselectableRadioButtonGroup>
      {renderCounter}
    </div>
  );
}
