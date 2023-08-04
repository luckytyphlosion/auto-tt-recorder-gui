
import React from "react";
import { useFormContextAutoTT, useWatchAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";

import { ChadsoftWriteCacheInput } from "./ChadsoftWriteCacheInput";
import { ChadsoftCacheExpiryInput } from "./ChadsoftCacheExpiryInput";

import { TriCheckbox } from "../TriCheckbox";

export function ChadsoftReadCacheAndSettingsInput() {
  const {register} = useFormContextAutoTT();
  const chadsoftReadCache = useWatchAutoTT({name: "chadsoft-read-cache"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  return (
    <div>
      <label htmlFor="chadsoft-read-cache">Read cached Chadsoft files (chadsoft-read-cache): </label>
      <TriCheckbox name="chadsoft-read-cache"/>
      <ChadsoftWriteCacheInput/>
      {
        isValueOrFILLMEIsValue(chadsoftReadCache, true) ? <ChadsoftCacheExpiryInput/> : ""
      }
    </div>
  );
}
