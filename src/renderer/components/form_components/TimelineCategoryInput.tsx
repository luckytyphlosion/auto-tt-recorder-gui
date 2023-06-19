import React, { useState, ReactElement } from "react";
import { useFormContext } from "react-hook-form";

import { NoTop10CategoryInput } from "./NoTop10CategoryInput";
import useRenderCounter from "../../RenderCounter";

export function TimelineCategoryInput(props: {
  noTop10Child: ReactElement, top10ChadsoftChild: ReactElement, top10GeckoChild: ReactElement
}) {
  const {register, getValues} = useFormContext();
  const [timelineCategory, setTimelineCategory] = useState("notop10");
  const renderCounter = useRenderCounter();

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
