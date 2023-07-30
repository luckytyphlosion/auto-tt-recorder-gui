import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export const INPUT_DISPLAYS = makeReadonlyArraySet(["auto", "gcn", "nunchuck", "none"] as const);
export type InputDisplay = ValidValues<typeof INPUT_DISPLAYS>;

export function InputDisplayInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <label htmlFor="input-display">Input Display: </label>
      <DeselectableRadioButtonGroup name="input-display">
        <DeselectableRadioButton labelValue="Auto detect (recommended): " id="input-display-gcn-classic" value="auto"/>
        <DeselectableRadioButton labelValue="GCN/Classic: " id="input-display-gcn-classic" value="gcn"/>
        <DeselectableRadioButton labelValue="Nunchuck: " id="input-display-nunchuck" value="nunchuck"/>
        <DeselectableRadioButton labelValue="None: " id="input-display-none" value="none"/>
      </DeselectableRadioButtonGroup>
    </div>
  );
}
