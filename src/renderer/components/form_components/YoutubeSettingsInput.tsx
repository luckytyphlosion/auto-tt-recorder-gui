

import React from "react";
import { useFormContext } from "react-hook-form";

export function YoutubeSettingsInput() {
  const {register} = useFormContext();
  return (
    <div>
      <label htmlFor="youtube-settings">Enable recommended encode settings for YouTube: </label>
      <input type="checkbox" {...register("youtube-settings")}/>
    </div>
  );
}
