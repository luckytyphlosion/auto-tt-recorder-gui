
import React from "react";
import { TriCheckbox } from "../TriCheckbox";

export function ChadsoftWriteCacheInput() {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="chadsoft-write-cache">Cache downloaded Chadsoft files (chadsoft-write-cache): </label>
      <div className="start-label-contents">
        <TriCheckbox name="chadsoft-write-cache" nameAsId={true}/>
      </div>
    </div>
  );
}
