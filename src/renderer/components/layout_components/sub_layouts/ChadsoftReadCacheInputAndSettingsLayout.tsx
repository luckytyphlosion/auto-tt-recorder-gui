
import React from "react";
import { useWatchAutoTT, isValueOrFILLMEIsValueMaker } from "../../../use-form-context-auto-tt";

import { ChadsoftWriteCacheInput } from "../../form_components/ChadsoftWriteCacheInput";
import { ChadsoftCacheExpiryInput } from "../../form_components/ChadsoftCacheExpiryInput";

import { TriCheckbox } from "../../generic_components/TriCheckbox";
import { FormInputNotesAutoTTRecArgName } from "../../reusable_components/FormInputNotesAutoTTRecArgName";

export function ChadsoftReadCacheInputAndSettingsLayout() {
  const chadsoftReadCache = useWatchAutoTT({name: "chadsoft-read-cache"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  return (
    <div className="grid-contents">
      <div className="grid-contents">
        <label className="start-label" htmlFor="chadsoft-read-cache">Read cached Chadsoft files: </label>
        <div className="start-label-contents">
          <TriCheckbox name="chadsoft-read-cache" nameAsId={true}/>
        </div>
        <label className="start-label"></label>
        <div className="start-label-contents">
          <p className="form-input-notes">Use cached Chadsoft files to avoid re-downloading them <FormInputNotesAutoTTRecArgName>chadsoft-read-cache</FormInputNotesAutoTTRecArgName>.</p>
        </div>
      </div>
      <ChadsoftWriteCacheInput/>
      {
        isValueOrFILLMEIsValue(chadsoftReadCache, true) ? <ChadsoftCacheExpiryInput/> : ""
      }
    </div>
  );
}
