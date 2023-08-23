import React from "react";
import { OpenFileTextInputWithButton } from "../OpenFileTextInputWithButton";

export function MainGhostFilenameInput() {
  return (<OpenFileTextInputWithButton name="main-ghost-filename" startLabel="RKG file to record: " dialogId="rkgs" fileFilters={[
    {name: "RKG files", extensions: ["rkg"]}
  ]}/>);
}
