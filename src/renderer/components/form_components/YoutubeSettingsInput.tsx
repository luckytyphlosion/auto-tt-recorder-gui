

import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function YoutubeSettingsInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="youtube-settings">Enable recommended encode settings for YouTube: </label>
      <input type="checkbox" {...register("youtube-settings")}/>
    </div>
  );
}
