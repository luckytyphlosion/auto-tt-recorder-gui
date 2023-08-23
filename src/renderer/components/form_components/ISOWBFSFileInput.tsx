import React from "react";

import { OpenFileTextInputWithButton } from "../OpenFileTextInputWithButton";

export function ISOWBFSFileInput() {
  return <OpenFileTextInputWithButton name="iso-filename" startLabel="ISO or WBFS: " dialogId="iso-wbfs" fileFilters={[
    {name: "ISO/WBFS files", extensions: ["iso", "wbfs"]}
  ]}
    notInGrid={true}
    noStartLabelClass={true}
  />
}
