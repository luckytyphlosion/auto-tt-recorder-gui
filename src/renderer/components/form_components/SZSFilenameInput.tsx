import React from "react";
import { OpenFileTextInputWithButton } from "../generic_components/OpenFileTextInputWithButton";

export function SZSFilenameInput() {
  return <OpenFileTextInputWithButton name="szs-filename" startLabel="SZS Filename: " dialogId="szs" fileFilters={[
    {name: "SZS files", extensions: ["szs"]}
  ]}/>
}
