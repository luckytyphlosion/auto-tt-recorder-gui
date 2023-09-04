import React from "react";
import { OpenFileTextInputWithButton } from "../generic_components/OpenFileTextInputWithButton";

export function MainGhostFilenameInput() {
  return (<OpenFileTextInputWithButton name="main-ghost-filename" startLabel="RKG file to record: " dialogId="rkgs" fileFilters={[
    {name: "RKG files", extensions: ["rkg"]}
  ]} errorMessageOnBottom={true}/>);
}
