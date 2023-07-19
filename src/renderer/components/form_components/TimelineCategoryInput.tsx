import React, { useState, ReactElement } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

import { NoTop10CategoryLayout } from "../layout_components/NoTop10CategoryLayout";
import useRenderCounter from "../../RenderCounter";

export type TimelineCategory = "notop10" | "top10chadsoft" | "top10gecko";

export function TimelineCategoryInput(props: {
  noTop10Child: ReactElement, top10ChadsoftChild: ReactElement, top10GeckoChild: ReactElement
}) {
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
      {
        timelineCategory === "notop10" ? props.noTop10Child
        : timelineCategory === "top10chadsoft" ? props.top10ChadsoftChild
        : timelineCategory === "top10gecko" ? props.top10GeckoChild
        : ""
      }
    </div>
  );
}
