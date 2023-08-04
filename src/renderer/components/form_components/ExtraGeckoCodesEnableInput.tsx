
import React from "react";
import { useFormContextAutoTT, useWatchAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";

import { ExtraGeckoCodesInput } from "./ExtraGeckoCodesInput";
import { TriCheckbox } from "../TriCheckbox";

export function ExtraGeckoCodesEnableInput(props: {isAutoTTRecRunning: boolean}) {
  const {register} = useFormContextAutoTT();
  const extraGeckoCodesEnable = useWatchAutoTT({name: "extra-gecko-codes-enable"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  return (
    <div>
      <label htmlFor="extra-gecko-codes-enable">Add extra gecko codes?</label>
      <TriCheckbox name="extra-gecko-codes-enable"/>
      {
        isValueOrFILLMEIsValue(extraGeckoCodesEnable, true) ? <ExtraGeckoCodesInput isAutoTTRecRunning={props.isAutoTTRecRunning}/> : ""
      }
    </div>
  );
}
