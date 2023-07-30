import React, { useState, ReactElement, useEffect } from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";

import { NoTop10CategoryLayout } from "./choice_layouts/NoTop10CategoryLayout";
import { Top10ChadsoftLayout } from "./main_layouts/Top10ChadsoftLayout";
import { Top10GeckoCodeLayout } from "./main_layouts/Top10GeckoCodeLayout";

import useRenderCounter from "../../RenderCounter";
import { FormComplexity } from "./FormComplexityLayout";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export const TIMELINE_CATEGORIES = makeReadonlyArraySet(["notop10", "top10chadsoft", "top10gecko"] as const);
export type TimelineCategory = ValidValues<typeof TIMELINE_CATEGORIES>;

export function TimelineCategoryLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity, importToggle: boolean}) {
  const {register, getValues} = useFormContextAutoTT();
  const timelineCategory = useWatchAutoTT({name: "timeline-category"});
  const renderCounter = useRenderCounter(false, "TimelineCategoryInput");

  console.log("TimelineCategoryLayout importToggle:", props.importToggle);

  console.log("timelineCategory:", timelineCategory, `, getValues("timeline-category"):`, getValues("timeline-category"));

  return (
    <div>
      <DeselectableRadioButtonGroup name="timeline-category" notDeselectable={true}>
        <DeselectableRadioButton labelValue="No Top 10:" id="timeline-category-no-top-10" value="notop10"/>
        <DeselectableRadioButton labelValue="Top 10 from Chadsoft: " id="timeline-category-top-10" value="top10chadsoft"/>
        <DeselectableRadioButton labelValue="Top 10 from Gecko Code: " id="timeline-category-top-10-manual" value="top10gecko"/>
      </DeselectableRadioButtonGroup>
      {renderCounter}
      <hr style={{height: "2px", borderWidth: 0, color: "gray", backgroundColor: "gray"}}/>
      {
        !props.importToggle ? (
          timelineCategory === "notop10" ? <NoTop10CategoryLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/>
          : timelineCategory === "top10chadsoft" ? <Top10ChadsoftLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/>
          : timelineCategory === "top10gecko" ? <Top10GeckoCodeLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/>
          : ""
        ) : ""
      }
    </div>
  );
}
