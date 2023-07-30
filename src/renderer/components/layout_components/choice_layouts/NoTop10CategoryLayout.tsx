import React, { useState, memo } from "react";
import { useFormContextAutoTT } from "../../../use-form-context-auto-tt";
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

const OutputVideoFilenameInput_Memo = memo(OutputVideoFilenameInput);
export function NoTop10CategoryLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity}) {
  const {register, getValues} = useFormContextAutoTT();
  const [noTop10Category, setNoTop10Category] = useState(getValues("no-top-10-category"));
  const renderCounter = useRenderCounter(true);

  function updateNoTop10Category(event?: Event) {
    setNoTop10Category(getValues("no-top-10-category"));
  }

  return (
    <div>
      <DeselectableRadioButtonGroup name="no-top-10-category" notDeselectable={true}>
        <DeselectableRadioButton labelValue="Mario Kart Channel: " id="no-top-10-category-mkchannel" value="mkchannel" onChange={updateNoTop10Category}/>
        <DeselectableRadioButton labelValue="Time Trial Ghost Select: " id="no-top-10-category-ghostselect" value="ghostselect" onChange={updateNoTop10Category}/>
        <DeselectableRadioButton labelValue="Race Only: " id="no-top-10-category-ghostonly" value="ghostonly" onChange={updateNoTop10Category}/>
      {
        props.formComplexity === FormComplexity.ALL ? <>
          <DeselectableRadioButton labelValue="Raw Frame Dump: " id="no-top-10-category-noencode" value="noencode" onChange={updateNoTop10Category}/>
        </> : ""
      }
      </DeselectableRadioButtonGroup>
      <hr style={{height: "2px", borderWidth: 0, color: "gray", backgroundColor: "gray"}}/>
      {
        noTop10Category === "mkchannel" ? <MarioKartChannelLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/> :
          noTop10Category === "ghostselect" ? <GhostSelectLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/> :
          noTop10Category === "ghostonly" ? <GhostOnlyLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/> : 
          noTop10Category === "noencode" ?
            props.formComplexity === FormComplexity.ALL ? <NoEncodeLayout isAutoTTRecRunning={props.isAutoTTRecRunning}/> : "" : ""
      }
      {renderCounter}
      <OutputVideoFilenameInput_Memo noTop10CategoryIsNoEncode={noTop10Category === "noencode"}/>
    </div>
  );
}
