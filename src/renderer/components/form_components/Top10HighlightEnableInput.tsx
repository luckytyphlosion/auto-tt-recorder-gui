
import React from "react";
import { useFormContextAutoTT, useWatchAutoTT, isValueOrFILLMEIsValueMaker } from "../../use-form-context-auto-tt";

import { Top10HighlightInput } from "./Top10HighlightInput";
import { MainGhostSourceInput } from "./MainGhostSourceInput";
import { TriCheckbox } from "../TriCheckbox";

export function Top10HighlightEnableInput() {
  const top10HighlightEnable = useWatchAutoTT({name: "top-10-highlight-enable"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="top-10-highlight-enable">Highlight Entry in Top 10 Leaderboard: </label>
      <div className="start-label-contents">
        <TriCheckbox name="top-10-highlight-enable" nameAsId={true}/>
      </div>
      {
        isValueOrFILLMEIsValue(top10HighlightEnable, true) ? <Top10HighlightInput/> : ""
      }
      {
        isValueOrFILLMEIsValue(top10HighlightEnable, false) ? <MainGhostSourceInput/> : ""
      }
    </div>
  );
}
