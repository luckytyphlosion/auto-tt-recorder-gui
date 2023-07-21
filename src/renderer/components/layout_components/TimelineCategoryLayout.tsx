import React, { useState, ReactElement } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

import { NoTop10CategoryLayout } from "./choice_layouts/NoTop10CategoryLayout";
import { Top10ChadsoftLayout } from "./main_layouts/Top10ChadsoftLayout";
import { Top10GeckoCodeLayout } from "./main_layouts/Top10GeckoCodeLayout";

import useRenderCounter from "../../RenderCounter";
import { FormComplexity } from "./FormComplexityLayout";

export type TimelineCategory = "notop10" | "top10chadsoft" | "top10gecko";

export function TimelineCategoryLayout(props: {isAutoTTRecRunning: boolean, formComplexity: FormComplexity}) {
  const {register, getValues} = useFormContextAutoTT();
  const [timelineCategory, setTimelineCategory] = useState(getValues("timeline-category"));
  const renderCounter = useRenderCounter(false, "TimelineCategoryInput");

  function updateTimelineCategory(event: Event) {
    setTimelineCategory(getValues("timeline-category"));
  }

  return (
    <div>
      <label htmlFor="timeline-category-no-top-10">No Top 10:</label>
      <input type="radio" id="timeline-category-no-top-10" value="notop10"
        {...register("timeline-category", {onChange: updateTimelineCategory})}
      ></input>
      <label htmlFor="timeline-category-top-10">Top 10 from Chadsoft: </label>
      <input type="radio" id="timeline-category-top-10" value="top10chadsoft"
        {...register("timeline-category", {onChange: updateTimelineCategory})}
      ></input>
      <label htmlFor="timeline-category-top-10-manual">Top 10 from Gecko Code: </label>
      <input type="radio" id="timeline-category-top-10-manual" value="top10gecko"
        {...register("timeline-category", {onChange: updateTimelineCategory})}
      ></input>
      {renderCounter}
      <hr style={{height: "2px", borderWidth: 0, color: "gray", backgroundColor: "gray"}}/>
      {
        timelineCategory === "notop10" ? <NoTop10CategoryLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/>
        : timelineCategory === "top10chadsoft" ? <Top10ChadsoftLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/>
        : timelineCategory === "top10gecko" ? <Top10GeckoCodeLayout isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={props.formComplexity}/>
        : ""
      }
    </div>
  );
}