import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";
import "../../styles/percent-input.css";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

export function GameVolumeInput() {
  const {register, setValue, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(true);

  function updateGameVolumeNumberInputFromSlider(event: Event) {
    setValue("game-volume-numberinput", getValues("game-volume-slider"), {shouldTouch: true});
  }

  function updateGameVolumeSliderFromNumberInput(event: Event) {
    let gameVolumeNumberInputValue = Math.min(getValues("game-volume-numberinput"), 125);
    setValue("game-volume-slider", gameVolumeNumberInputValue, {shouldTouch: true});
  }

  return (
    <div>
      <label htmlFor="game-volume-slider">Game volume: </label>
      <input type="range" min={0} max={125} step={1} {...register("game-volume-slider", {
        onChange: updateGameVolumeNumberInputFromSlider})}/>
      <span className="percent-input">
        <input type="number" style={{width: "4em"}}
          {...register("game-volume-numberinput", {required: {
            value: true,
            message: "This input is required."
          }, valueAsNumber: true,
          min: {
            value: 0,
            message: "Game volume cannot be less than zero."
          }, onChange: updateGameVolumeSliderFromNumberInput})}
        ></input>%
      </span>
      <SimpleErrorMessage name="game-volume-numberinput"/>
      {renderCounter}
    </div>
  );
}
