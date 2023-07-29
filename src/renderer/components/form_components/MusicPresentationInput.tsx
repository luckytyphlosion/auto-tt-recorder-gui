
import React, { useEffect } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const MUSIC_PRESENTATIONS = makeReadonlyArraySet(["start-music-at-beginning", "no-music-mkchannel", "normal"]);
export type MusicPresentation = ValidValues<typeof MUSIC_PRESENTATIONS>;

export function MusicPresentationInput(props: {hasMusic: boolean, isOnMKChannel: boolean}) {
  const {register, getValues, setValue} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "MusicPresentationInput");

  useEffect(() => {
    let musicPresentation = getValues("music-presentation");
    if (!props.hasMusic && musicPresentation === "start-music-at-beginning") {
      setValue("music-presentation", "normal", {shouldTouch: true});
    } else if (!props.isOnMKChannel && musicPresentation === "no-music-mkchannel") {
      setValue("music-presentation", "normal", {shouldTouch: true});
    }
  }, [props.hasMusic, props.isOnMKChannel]);

  return (
    <div>
      <label htmlFor="music-presentation">Music presentation: </label>
      <label htmlFor="music-presentation-normal">Normal: </label>
      <input type="radio" id="music-presentation-normal" value="normal"
        {...register("music-presentation")}
      ></input>
      {
        props.hasMusic ? <>
          <label htmlFor="music-presentation-start-music-at-beginning">Start music at beginning: </label>
          <input type="radio" id="music-presentation-start-music-at-beginning" value="start-music-at-beginning"
            {...register("music-presentation")}
          ></input>
        </> : ""
      }
      {
        props.isOnMKChannel ? <>
          <label htmlFor="music-presentation-no-music-mkchannel">No music on the Mario Kart Channel: </label>
          <input type="radio" id="music-presentation-no-music-mkchannel" value="no-music-mkchannel"
            {...register("music-presentation")}
          ></input>
        </> : ""
      }
      {renderCounter}
    </div>
  );
}
