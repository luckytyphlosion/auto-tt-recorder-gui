
import React from "react";
import { useFormContextAutoTT, useWatchAutoTT, isValueOrFILLMEIsValueMaker } from "../../../use-form-context-auto-tt";

import { ChadsoftWriteCacheInput } from "../../form_components/ChadsoftWriteCacheInput";
import { ChadsoftCacheExpiryInput } from "../../form_components/ChadsoftCacheExpiryInput";

import { TriCheckbox } from "../../TriCheckbox";

export function ChadsoftReadCacheInputAndSettingsLayout() {
  const chadsoftReadCache = useWatchAutoTT({name: "chadsoft-read-cache"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  return (
    <div className="grid-contents">
      <div className="grid-contents">
        <label className="start-label" htmlFor="chadsoft-read-cache">Read cached Chadsoft files (chadsoft-read-cache): </label>
        <div className="start-label-contents">
          <TriCheckbox name="chadsoft-read-cache" nameAsId={true}/>
        </div>
      </div>
      <ChadsoftWriteCacheInput/>
      {
        isValueOrFILLMEIsValue(chadsoftReadCache, true) ? <ChadsoftCacheExpiryInput/> : ""
      }
    </div>
  );
}
