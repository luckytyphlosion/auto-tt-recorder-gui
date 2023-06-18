import React from "react";
import { useFormContext } from "react-hook-form";

export function SetTimelineInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="timeline-mkchannel">Mario Kart Channel: </label>
      <input type="radio" id="timeline-mkchannel" value="mkchannel"
        {...register("set-timeline")}
      ></input>
      <label htmlFor="timeline-top10chadsoft">Top 10 from Chadsoft: </label>
      <input type="radio" id="timeline-top10chadsoft" value="top10chadsoft"
        {...register("set-timeline")}
      ></input>
      <label htmlFor="timeline-top10gecko">Top 10 from Gecko: </label>
      <input type="radio" id="timeline-top10gecko" value="top10gecko"
        {...register("set-timeline")}
      ></input>
      <label htmlFor="timeline-ghostselect">Time Trial Ghost Select: </label>
      <input type="radio" id="timeline-ghostselect" value="ghostselect"
        {...register("set-timeline")}
      ></input>
      <label htmlFor="timeline-ghostonly">Race Only: </label>
      <input type="radio" id="timeline-ghostonly" value="ghostonly"
        {...register("set-timeline")}
      ></input>
      <label htmlFor="timeline-noencode">Raw Frame Dump: </label>
      <input type="radio" id="timeline-noencode" value="noencode"
        {...register("set-timeline")}
      ></input>
    </div>
  );
}
