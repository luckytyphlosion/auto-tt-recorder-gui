import React from "react";

import { InputDisplayInput } from "../../form_components/InputDisplayInput";
import { ExtraGeckoCodesEnableInput } from "../../form_components/ExtraGeckoCodesEnableInput";
import { SZSSourceInput } from "../../form_components/SZSSourceInput";

export function CustomizationSettingsLayout(props: {isAutoTTRecRunning: boolean}) {
  return (
    <>
      <br/>
      
      <ExtraGeckoCodesEnableInput isAutoTTRecRunning={props.isAutoTTRecRunning}/>
    </>
  );
}