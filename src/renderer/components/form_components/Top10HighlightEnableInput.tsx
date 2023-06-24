
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function Top10HighlightEnableInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="top-10-highlight-enable">Highlight Entry in Top 10 Leaderboard: </label>
      <input type="checkbox" {...register("top-10-highlight-enable")}/>
    </div>
  );
}
