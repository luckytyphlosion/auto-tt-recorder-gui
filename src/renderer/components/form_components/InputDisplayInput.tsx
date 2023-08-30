import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";

export const INPUT_DISPLAYS = makeReadonlyArraySet(["auto", "gcn", "nunchuck", "none"] as const);
export type InputDisplay = ValidValues<typeof INPUT_DISPLAYS>;

export function InputDisplayInput() {

  return (
    <div className="grid-contents">
      <label className="start-label">Input Display: </label>
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="input-display" blockDisplay={true}>
          <DeselectableRadioButton labelValue="Auto detect (recommended)" id="input-display-gcn-classic" value="auto"/>
          <DeselectableRadioButton labelValue="GCN/Classic" id="input-display-gcn-classic" value="gcn"/>
          <DeselectableRadioButton labelValue="Nunchuck" id="input-display-nunchuck" value="nunchuck"/>
          <DeselectableRadioButton labelValue="None" id="input-display-none" value="none"/>
        </DeselectableRadioButtonGroup>
      </div>
    </div>
  );
}
