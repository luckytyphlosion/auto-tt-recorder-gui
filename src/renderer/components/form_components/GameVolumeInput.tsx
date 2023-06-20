import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

export function GameVolumeInput() {
  const {register, setValue, getValues} = useFormContext();
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
      <input type="number"
        {...register("game-volume-numberinput", {required: true, min: 0, onChange: updateGameVolumeSliderFromNumberInput})}
      ></input>
      {renderCounter}
    </div>
  );
}
