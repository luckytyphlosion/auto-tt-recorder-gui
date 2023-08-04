import React, { memo, useState, ReactElement, useEffect } from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";

import { NoTop10CategoryLayout, NoTop10Category } from "./choice_layouts/NoTop10CategoryLayout";
import { Top10ChadsoftLayout } from "./main_layouts/Top10ChadsoftLayout";
import { Top10GeckoCodeLayout } from "./main_layouts/Top10GeckoCodeLayout";

import useRenderCounter from "../../RenderCounter";
import { FormComplexity } from "./FormComplexityLayout";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../DeselectableRadioButton";

export const TIMELINE_CATEGORIES = makeReadonlyArraySet(["notop10", "top10chadsoft", "top10gecko"] as const);
export type TimelineCategory = ValidValues<typeof TIMELINE_CATEGORIES>;

function doesNoTop10CategoryNeedsToAdjustToGhostonly(formComplexity: FormComplexity, timelineCategory: TimelineCategory, noTop10Category: NoTop10Category) {
  if (formComplexity < FormComplexity.ALL && timelineCategory === "notop10" && noTop10Category === "noencode") {
    return true;
  } else {
    return false;
  }
}

export function TimelineCategoryLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity, unrenderFormToggle: boolean}) {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const timelineCategory = useWatchAutoTT({name: "timeline-category"});
  const renderCounter = useRenderCounter(false, "TimelineCategoryInput");
  let noTop10Category = useWatchAutoTT({name: "no-top-10-category"});

  let shouldAdjustToGhostonly = doesNoTop10CategoryNeedsToAdjustToGhostonly(props.formComplexity, timelineCategory, noTop10Category);
  if (shouldAdjustToGhostonly) {
    setValue("no-top-10-category", "ghostonly", {shouldTouch: true});
    noTop10Category = "ghostonly";
  }

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
        !props.unrenderFormToggle ? (
          timelineCategory === "notop10" ? <NoTop10CategoryLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity} noTop10Category={noTop10Category}/>
          : timelineCategory === "top10chadsoft" ? <Top10ChadsoftLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/>
          : timelineCategory === "top10gecko" ? <Top10GeckoCodeLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/>
          : ""
        ) : ""
      }
    </div>
  );
}
