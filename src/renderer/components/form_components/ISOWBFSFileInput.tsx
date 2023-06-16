import React, { useState } from "react";
import { AutoTTRecArgs } from "../../../auto-tt-rec-args";
import useRenderCounter from "../../RenderCounter";
import { UseFormRegister, UseFormSetValue, FieldValues } from "react-hook-form";

interface ISOWBFSFileInputProps {
  autoTTRecArgs: AutoTTRecArgs;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

interface FileFilter {
  name: string;
  extensions: string[];
}

export function ISOWBFSFileInput(props: ISOWBFSFileInputProps) {
  //const [isoFilename, setIsoFilename] = useState("");
  const renderCounter = useRenderCounter();

  // function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
  //   props.autoTTRecArgs.setIsoFilename(event.target.value + "q");
  //   setIsoFilename(event.target.value);
  // }

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters);
    props.setValue("isoFilename", response, {shouldTouch: true});
    //props.autoTTRecArgs.setIsoFilename(response);
    //setIsoFilename(response);
    //console.log("props.autoTTRecArgs.getIsoFilename():", props.autoTTRecArgs.getIsoFilename());
  }

  return (
    <div>
      <label htmlFor="iso-filename">ISO or WBFS: </label>
      <input type="text"
        id="iso-filename" {...props.register("isoFilename", {required: true})} /*value={props.autoTTRecArgs.getIsoFilename()}*/
        /*onChange={(event) => {(this.onInputChange2("iso-filename", false))}}*/
        /*onChange={onInputChange}*/
      ></input>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "ISO/WBFS files", extensions: ["iso", "wbfs"]}
        ]);
      }} id="iso-filename-btn" type="button">Browse&#8230;</button>
      {renderCounter}
    </div>
  );
}

export default ISOWBFSFileInput;
