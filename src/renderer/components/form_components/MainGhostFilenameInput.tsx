import React, { useState } from "react";
import { AutoTTRecArgs } from "../../../auto-tt-rec-args";
import useRenderCounter from "../../RenderCounter";
import { useFormContext } from "react-hook-form";
import { FileFilter } from "electron";

export function MainGhostFilenameInput(props: {arg: number}) {
  const {register, setValue} = useFormContext();
  const [randomNum, setRandomNum] = useState(Math.random());
  const [count, setCount] = useState(0);

  async function queueOpenDialog(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let response = await window.api.openFileDialog(fileFilters);
    setValue("main-ghost-filename", response, {shouldTouch: true});
    setCount(count + 1);
  }

  return (
    <div>
      <label htmlFor="main-ghost-filename">RKG file to record {props.arg}, {randomNum}, {count}: </label>
      <input type="text" readOnly
        {...register("main-ghost-filename", {required: true})}
      ></input>
      <button onClick={event => {
        queueOpenDialog(event, [
          {name: "RKG files", extensions: ["rkg"]}
        ]);
      }} type="button">Browse&#8230;</button>
    </div>
  );
}
