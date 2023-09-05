import React, { useState } from "react";
import { useFormContextAutoTT, lateValidateNumberInputMaker } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";
import "../../styles/percent-input.css";

import { SimpleErrorMessage } from "../reusable_components/SimpleErrorMessage";

export function MusicVolumeInput() {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "MusicVolumeInput");
  const onBlur = lateValidateNumberInputMaker("music-volume-numberinput");

  function updateMusicVolumeNumberInputFromSlider(event: Event) {
    setValue("music-volume-numberinput", getValues("music-volume-slider"), {shouldTouch: true});
  }

  function updateMusicVolumeSliderFromNumberInput(event: Event) {
    let musicVolumeNumberInputValue = Math.min(getValues("music-volume-numberinput"), 125);
    setValue("music-volume-slider", musicVolumeNumberInputValue, {shouldTouch: true});
  }

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="music-volume-slider">Music volume: </label>
      <div className="start-label-contents">
        <input type="range" min={0} max={125} step={1} {...register("music-volume-slider", {
          onChange: updateMusicVolumeNumberInputFromSlider, onBlur: onBlur})}/>
        <span className="percent-input">
          <input type="number" style={{width: "4em"}}
            {...register("music-volume-numberinput", {required: {
              value: true,
              message: "This input is required."
            }, valueAsNumber: true,
            min: {
              value: 0,
              message: "Music volume cannot be less than zero."
            }, onChange: updateMusicVolumeSliderFromNumberInput,
            onBlur: onBlur})}
          ></input>%
        </span>
        {renderCounter}
      </div>
      <div className="start-label"></div>
      <div className="start-label-contents">
        <SimpleErrorMessage name="music-volume-numberinput" marginBlockDisplay={true}/>
      </div>
    </div>
  );
}
