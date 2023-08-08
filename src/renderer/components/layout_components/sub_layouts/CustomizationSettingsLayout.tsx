import React from "react";

import { InputDisplayInput } from "../../form_components/InputDisplayInput";
import { ExtraGeckoCodesEnableInput } from "../../form_components/ExtraGeckoCodesEnableInput";
import { SZSSourceInput } from "../../form_components/SZSSourceInput";
import { FieldsetOr } from "../../FieldsetOr";

export function CustomizationSettingsLayout(props: {isAutoTTRecRunning: boolean}) {
  return (
    <>
      <FieldsetOr>
        <legend>Customization Settings</legend>
        <ExtraGeckoCodesEnableInput isAutoTTRecRunning={props.isAutoTTRecRunning}/>
      </FieldsetOr>      
    </>
  );
}