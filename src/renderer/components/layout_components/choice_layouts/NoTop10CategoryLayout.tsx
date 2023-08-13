import React, { useState, memo, useEffect } from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../../use-form-context-auto-tt";
import useRenderCounter from "../../../RenderCounter";

import { MarioKartChannelLayout } from "../main_layouts/MarioKartChannelLayout";
import { GhostSelectLayout } from "../main_layouts/GhostSelectLayout";
import { GhostOnlyLayout } from "../main_layouts/GhostOnlyLayout";
import { NoEncodeLayout } from "../main_layouts/NoEncodeLayout";
import { OutputVideoFilenameInput } from "../../form_components/OutputVideoFilenameInput";
import { FormComplexity } from "../FormComplexityLayout";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../../DeselectableRadioButton";

import { makeReadonlyArraySet, ValidValues } from "../../../../shared/array-set";

export const NO_TOP_10_CATEGORIES = makeReadonlyArraySet(["mkchannel", "ghostselect", "ghostonly", "noencode"] as const);
export type NoTop10Category = ValidValues<typeof NO_TOP_10_CATEGORIES>;

export const TIMELINES = makeReadonlyArraySet([...NO_TOP_10_CATEGORIES.arr, "top10"] as const);
export type Timeline = ValidValues<typeof TIMELINES>;

const OutputVideoFilenameInput_Memo = memo(OutputVideoFilenameInput);
export function NoTop10CategoryLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity, noTop10Category: NoTop10Category}) {
  const {register, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "NoTop10CategoryLayout");

  //console.log("noTop10Category:", props.noTop10Category, `, getValues("no-top-10-category"):`, getValues("no-top-10-category"));
  return (
    <div>
      <DeselectableRadioButtonGroup name="no-top-10-category" notDeselectable={true}>
        <DeselectableRadioButton labelValue="Mario Kart Channel: " id="no-top-10-category-mkchannel" value="mkchannel"/>
        <DeselectableRadioButton labelValue="Time Trial Ghost Select: " id="no-top-10-category-ghostselect" value="ghostselect"/>
        <DeselectableRadioButton labelValue="Race Only: " id="no-top-10-category-ghostonly" value="ghostonly"/>
      {
        props.formComplexity === FormComplexity.ALL ? <>
          <DeselectableRadioButton labelValue="Raw Frame Dump: " id="no-top-10-category-noencode" value="noencode"/>
        </> : ""
      }
      </DeselectableRadioButtonGroup>
      {renderCounter}
      <hr style={{height: "2px", borderWidth: 0, color: "gray", backgroundColor: "gray"}}/>
      {
        props.noTop10Category === "mkchannel" ? <MarioKartChannelLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/> :
          props.noTop10Category === "ghostselect" ? <GhostSelectLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/> :
          props.noTop10Category === "ghostonly" ? <GhostOnlyLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/> : 
          props.noTop10Category === "noencode" ?
            props.formComplexity === FormComplexity.ALL ? <NoEncodeLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/> : "" : ""
      }      
      <OutputVideoFilenameInput_Memo noTop10CategoryIsNoEncode={props.noTop10Category === "noencode"}/>
    </div>
  );
}
