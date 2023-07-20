import React, { useState, memo } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { MarioKartChannelLayout } from "./MarioKartChannelLayout";
import { GhostSelectLayout } from "./GhostSelectLayout";
import { GhostOnlyLayout } from "./GhostOnlyLayout";
import { NoEncodeLayout } from "./NoEncodeLayout";
import { OutputVideoFilenameInput } from "../form_components/OutputVideoFilenameInput";
import { FormComplexity } from "./FormComplexityLayout";

export type NoTop10Category = "mkchannel" | "ghostselect" | "ghostonly" | "noencode";

const OutputVideoFilenameInput_Memo = memo(OutputVideoFilenameInput);
export function NoTop10CategoryLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity}) {
  const {register, getValues} = useFormContextAutoTT();
  const [noTop10Category, setNoTop10Category] = useState(getValues("no-top-10-category"));
  const renderCounter = useRenderCounter(true);

  function updateNoTop10Category(event: Event) {
    setNoTop10Category(getValues("no-top-10-category"));
  }

  return (
    <div>
      <label htmlFor="no-top-10-category-mkchannel">Mario Kart Channel: </label>
      <input type="radio" id="no-top-10-category-mkchannel" value="mkchannel"
        {...register("no-top-10-category", {onChange: updateNoTop10Category})}
      ></input>
      <label htmlFor="no-top-10-category-ghostselect">Time Trial Ghost Select: </label>
      <input type="radio" id="no-top-10-category-ghostselect" value="ghostselect"
        {...register("no-top-10-category", {onChange: updateNoTop10Category})}
      ></input>
      <label htmlFor="no-top-10-category-ghostonly">Race Only: </label>
      <input type="radio" id="no-top-10-category-ghostonly" value="ghostonly"
        {...register("no-top-10-category", {onChange: updateNoTop10Category})}
      ></input>
      <label htmlFor="no-top-10-category-noencode">Raw Frame Dump: </label>
      <input type="radio" id="no-top-10-category-noencode" value="noencode"
        {...register("no-top-10-category", {onChange: updateNoTop10Category})}
      ></input>
      {
        noTop10Category === "mkchannel" ? <MarioKartChannelLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/> :
          noTop10Category === "ghostselect" ? <GhostSelectLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/> :
          noTop10Category === "ghostonly" ? <GhostOnlyLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/> : 
          noTop10Category === "noencode" ? <NoEncodeLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/> : ""
      }
      {renderCounter}
      <OutputVideoFilenameInput_Memo noTop10CategoryIsNoEncode={noTop10Category === "noencode"}/>
    </div>
  );
}
