import React from "react";
import { OpenFileTextInputWithButton } from "../OpenFileTextInputWithButton";

export function ComparisonGhostFilenameInput() {
  return (<OpenFileTextInputWithButton name="comparison-ghost-filename" startLabel="Comparison RKG file: " dialogId="rkgs" fileFilters={[
    {name: "RKG files", extensions: ["rkg"]}
  ]}/>);
}
