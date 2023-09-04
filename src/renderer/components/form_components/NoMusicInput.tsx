
import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function NoMusicInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="no-music">Disable Game BGM: </label>
      <div className="start-label-contents">
        <TriCheckbox name="no-music" nameAsId={true}/>
      </div>
    </div>
  );
}
