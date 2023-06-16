import React, { useState } from "react";
import { AutoTTRecArgs } from "../../../auto-tt-rec-args";
import useRenderCounter from "../../RenderCounter";
import { UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

interface ISOWBFSFileInputProps {
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

interface FileFilter {
  name: string;
  extensions: string[];
}

function ISOWBFSFileInput(props: ISOWBFSFileInputProps) {
  const renderCounter = useRenderCounter();

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters);
    props.setValue("iso-filename", response, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="iso-filename">ISO or WBFS: </label>
      <input type="text"
        {...props.register("iso-filename", {required: true})}
      ></input>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "ISO/WBFS files", extensions: ["iso", "wbfs"]}
        ]);
      }} type="button">Browse&#8230;</button>
      {renderCounter}
    </div>
  );
}

export default ISOWBFSFileInput;
