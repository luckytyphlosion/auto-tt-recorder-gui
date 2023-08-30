import React from "react";

import { OpenFileTextInputWithButton } from "../generic_components/OpenFileTextInputWithButton";

export function ISOWBFSFileInput() {
  return <OpenFileTextInputWithButton name="iso-filename" startLabel="ISO or WBFS: " dialogId="iso-wbfs" fileFilters={[
    {name: "ISO/WBFS files", extensions: ["iso", "wbfs"]}
  ]}
    notInGrid={true}
    noStartLabelClass={true}
  />
}
