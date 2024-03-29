
import React, { useEffect } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";
import { DeselectableRadioButton, DeselectableRadioButtonGroup } from "../generic_components/DeselectableRadioButton";

import { makeReadonlyArraySet, ValidValues } from "../../../shared/array-set";

export const MUSIC_PRESENTATIONS = makeReadonlyArraySet(["start-music-at-beginning", "no-music-mkchannel", "normal"] as const);
export type MusicPresentation = ValidValues<typeof MUSIC_PRESENTATIONS>;

export function MusicPresentationInput(props: {hasMusic: boolean, isOnMKChannel: boolean}) {
  const {getValues, setValue} = useFormContextAutoTT();
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
    <div className="grid-contents">
      <label className="start-label">Music presentation: </label>
      <div className="start-label-contents">
        <DeselectableRadioButtonGroup name="music-presentation" blockDisplay={true} errorBelow={true}>
          <DeselectableRadioButton labelValue="Normal" id="music-presentation-normal" value="normal"/>
          {
            props.hasMusic ? <>
              <DeselectableRadioButton labelValue="Start music at beginning" id="music-presentation-start-music-at-beginning" value="start-music-at-beginning"/>
            </> : ""
          }
          {
            props.isOnMKChannel ? <>
              <DeselectableRadioButton labelValue="No music on the Mario Kart Channel" id="music-presentation-no-music-mkchannel" value="no-music-mkchannel"/>
            </> : ""
          }
        </DeselectableRadioButtonGroup>
        {renderCounter}
      </div>
    </div>
  );
}
