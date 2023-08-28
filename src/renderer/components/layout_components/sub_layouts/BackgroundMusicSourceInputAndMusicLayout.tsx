import React, { useState, useEffect } from "react";
import { useFormContextAutoTT, useWatchExpandUnselectedChoiceInputs, isValueOrFILLMEIsValueMaker, useWatchAutoTT } from "../../../use-form-context-auto-tt";
import { MusicFilenameInput } from "../../form_components/MusicFilenameInput";
import { GameVolumeInput } from "../../form_components/GameVolumeInput";
import { MusicVolumeInput } from "../../form_components/MusicVolumeInput";
import { MusicPresentationInput } from "../../form_components/MusicPresentationInput";
import { FormComplexity } from "../FormComplexityLayout";
import { Timeline } from "../choice_layouts/NoTop10CategoryLayout";
import { DeselectableDropdown } from "../../DeselectableDropdown";
import { makeReadonlyArraySet, ValidValues } from "../../../../shared/array-set";
import { SimpleErrorMessage } from "../../SimpleErrorMessage";
import { FieldsetOr } from "../../FieldsetOr";
import { isFileReadable } from "../../../util-renderer";

import useRenderCounter from "../../../RenderCounter";

export const BACKGROUND_MUSIC_SOURCES = makeReadonlyArraySet(["music-filename", "game-bgm", "none"] as const);
export type BackgroundMusicSource = ValidValues<typeof BACKGROUND_MUSIC_SOURCES>;

export function BackgroundMusicSourceInputAndMusicLayout(props: {timeline: Timeline, formComplexity: FormComplexity}) {
  const {register, getValues} = useFormContextAutoTT();
  const backgroundMusicSource = useWatchAutoTT({name: "background-music-source"});
  const isValueOrFILLMEIsValue = isValueOrFILLMEIsValueMaker();
  const musicFilenameInputEnable = isValueOrFILLMEIsValue(backgroundMusicSource, "music-filename");

  const renderCounter = useRenderCounter(false, "BackgroundMusicSourceInputAndMusicLayout");

  let isOnMKChannel = props.timeline === "top10" || props.timeline === "mkchannel";
  let enableMusicPresentationInput = isOnMKChannel || (props.timeline === "ghostselect" && musicFilenameInputEnable);

  async function validateBackgroundMusicSourceAndCheckIsFileReadable(musicFilenameOrBackgroundMusicSource: string): Promise<string | boolean> {
    //let backgroundMusicSource = getValues("background-music-source");
    //console.log("validateBackgroundMusicSourceAndCheckIsFileReadable backgroundMusicSource:", backgroundMusicSource);
    let backgroundMusicSource = getValues("background-music-source");
    console.log("validateBackgroundMusicSourceAndCheckIsFileReadable backgroundMusicSource:", backgroundMusicSource);
    if (backgroundMusicSource === "game-bgm" || backgroundMusicSource === "none") {
      return true;
    } else if (backgroundMusicSource === "<FILLME>") {
      return "Background music source (dropdown) is required.";
    } else if (backgroundMusicSource === "music-filename") {
      let musicFilename = getValues("music-filename");
      console.log("validateBackgroundMusicSourceAndCheckIsFileReadable musicFilename:", musicFilename);
      if (musicFilename === "") {
        return "This input is required.";
      } else {
        return await isFileReadable(musicFilename);
      }
    } else {
      return `Impossible error occurred, please contact the developer! (background-music-source: ${backgroundMusicSource})`;
    }
  }

  return (
    <div>
      <FieldsetOr>
        <legend>Music</legend>
        <div className="like-input-group">
          <label className="start-label" htmlFor="background-music-source">Background Music: </label>
          <div className="start-label-contents">
            <DeselectableDropdown name="background-music-source" noErrorMessage={true} customValidate={validateBackgroundMusicSourceAndCheckIsFileReadable}>
              <option value="music-filename">Music filename</option>
              <option value="game-bgm">Game BGM</option>
              <option value="none">None</option>
            </DeselectableDropdown>
            {
              musicFilenameInputEnable ? 
              <MusicFilenameInput validateBackgroundMusicSourceAndCheckIsFileReadable={validateBackgroundMusicSourceAndCheckIsFileReadable}/> : <SimpleErrorMessage name="background-music-source"/>
            }
          </div>
          {
              enableMusicPresentationInput && props.formComplexity > FormComplexity.SIMPLE ?
                <MusicPresentationInput hasMusic={musicFilenameInputEnable} isOnMKChannel={isOnMKChannel}/> : ""
            }
            {
              musicFilenameInputEnable ?
              <div className="grid-contents">
                <GameVolumeInput/>
                <MusicVolumeInput/>
              </div> : ""
            }
        </div>
      </FieldsetOr>
      {renderCounter}
    </div>    
  );
}
