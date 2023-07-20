
import React from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";

import { ExtraGeckoCodesInput } from "./ExtraGeckoCodesInput";

export function ExtraGeckoCodesEnableInput(props: {isAutoTTRecRunning: boolean}) {
  const {register} = useFormContextAutoTT();
  const extraGeckoCodesEnable = useWatchAutoTT({name: "extra-gecko-codes-enable"});

  return (
    <div>
      <label htmlFor="extra-gecko-codes-enable">Add extra gecko codes?</label>
      <input type="checkbox" {...register("extra-gecko-codes-enable")}/>
      {
        extraGeckoCodesEnable ? <ExtraGeckoCodesInput isAutoTTRecRunning={props.isAutoTTRecRunning}/> : ""
      }
    </div>
  );
}
