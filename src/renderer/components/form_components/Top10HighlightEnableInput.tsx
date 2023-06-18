
import React from "react";
import { useFormContext } from "react-hook-form";

export function Top10HighlightEnableInput() {
  const {register} = useFormContext();
  return (
    <div>
      <label htmlFor="top-10-highlight-enable">Highlight Entry in Top 10 Leaderboard: </label>
      <input type="checkbox" {...register("top-10-highlight-enable")}/>
    </div>
  );
}
