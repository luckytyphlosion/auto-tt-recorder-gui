
import React from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";

import { Top10HighlightInput } from "./Top10HighlightInput";
import { MainGhostSourceInput } from "./MainGhostSourceInput";
import { TriCheckbox } from "../TriCheckbox";

export function Top10HighlightEnableInput() {
  const {register} = useFormContextAutoTT();
  const top10HighlightEnable = useWatchAutoTT({name: "top-10-highlight-enable"});

  return (
    <div>
      <label htmlFor="top-10-highlight-enable">Highlight Entry in Top 10 Leaderboard: </label>
      <TriCheckbox name="top-10-highlight-enable"/>
      {
        top10HighlightEnable ? <Top10HighlightInput/> : <MainGhostSourceInput/>
      }
    </div>
  );
}
