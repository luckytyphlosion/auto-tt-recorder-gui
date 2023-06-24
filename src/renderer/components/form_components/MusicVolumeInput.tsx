import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";
import "../../styles/percent-input.css";

import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function MusicVolumeInput() {
  const {register, setValue, getValues} = useFormContext();
  const renderCounter = useRenderCounter(true);

  function updateMusicVolumeNumberInputFromSlider(event: Event) {
    setValue("music-volume-numberinput", getValues("music-volume-slider"), {shouldTouch: true});
  }

  function updateMusicVolumeSliderFromNumberInput(event: Event) {
    let musicVolumeNumberInputValue = Math.min(getValues("music-volume-numberinput"), 125);
    setValue("music-volume-slider", musicVolumeNumberInputValue, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="music-volume-slider">Music volume: </label>
      <input type="range" min={0} max={125} step={1} {...register("music-volume-slider", {
        onChange: updateMusicVolumeNumberInputFromSlider})}/>
      <span className="percent-input">
        <input type="number" style={{width: "4em"}}
          {...register("music-volume-numberinput", {required: {
            value: true,
            message: "This input is required."
          }, valueAsNumber: true,
          min: {
            value: 0,
            message: "Music volume cannot be less than zero."
          }, onChange: updateMusicVolumeSliderFromNumberInput})}
        ></input>%
      </span>
      <SimpleErrorMessage name="music-volume-numberinput"/>
      {renderCounter}
    </div>
  );
}