
import React from "react";
import { useFormContextAutoTT, useWatchAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";

import { ExtraGeckoCodesInput } from "./ExtraGeckoCodesInput";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function ExtraGeckoCodesEnableInput(props: {isAutoTTRecRunning: boolean}) {
  const {register} = useFormContextAutoTT();
  const extraGeckoCodesEnable = useWatchAutoTT({name: "extra-gecko-codes-enable"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  return (
    <div>
      <div className="like-input-group">
        <label className="start-label" htmlFor="extra-gecko-codes-enable">Add extra gecko codes?</label>
        <div className="start-label-contents">
          <TriCheckbox name="extra-gecko-codes-enable" nameAsId={true}/>
        </div>
      </div>
      {
        isValueOrFILLMEIsValue(extraGeckoCodesEnable, true) ? <ExtraGeckoCodesInput isAutoTTRecRunning={props.isAutoTTRecRunning}/> : ""
      }
    </div>
  );
}
