

import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { TriCheckbox } from "../TriCheckbox";

export function YoutubeSettingsInput(props: {addCRFReminderToLabel: boolean}) {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="youtube-settings">Enable recommended encode settings for YouTube{props.addCRFReminderToLabel ? " (For CRF)" : ""}: </label>
      <TriCheckbox name="youtube-settings"/>
    </div>
  );
}
