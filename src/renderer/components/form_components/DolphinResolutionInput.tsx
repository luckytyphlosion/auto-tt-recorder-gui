
import React from "react";
import { useFormContext } from "react-hook-form";

export function DolphinResolutionInput() {
  const {register} = useFormContext();

  return (
    <div>
      <label htmlFor="dolphin-resolution">Dolphin resolution: </label>
      <select {...register("dolphin-resolution", {
        required: true})}>
        <option value="2160p">2160p (4K)</option>
        <option value="1440p">1440p (2K)</option>
        <option value="1080p">1080p</option>
        <option value="720p">720p</option>
        <option value="480p">480p</option>
      </select>
    </div>
  );
}
