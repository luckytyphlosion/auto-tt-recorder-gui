import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

import { makeReadonlyArraySet, ValidValues} from "../../../shared/array-set";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export const SET_200CC_VALUES = makeReadonlyArraySet(["no-200cc", "on-200cc"] as const);
export type Set200cc = ValidValues<typeof SET_200CC_VALUES>;

export function Set200ccInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div>
      <DeselectableRadioButtonGroup name="set-200cc">
        <DeselectableRadioButton labelValue="150cc: " id="no-200cc" value="no-200cc"/>
        <DeselectableRadioButton labelValue="200cc: " id="on-200cc" value="on-200cc"/>
      </DeselectableRadioButtonGroup>
    </div>
  );
}
