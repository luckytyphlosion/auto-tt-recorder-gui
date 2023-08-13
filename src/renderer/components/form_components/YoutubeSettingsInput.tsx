

import React from "react";
import { TriCheckbox } from "../TriCheckbox";

export function YoutubeSettingsInput(props: {addCRFReminderToLabel: boolean}) {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="youtube-settings">Enable recommended encode settings for YouTube{props.addCRFReminderToLabel ? " (For CRF)" : ""}: </label>
      <div className="start-label-contents">
        <TriCheckbox name="youtube-settings" nameAsId={true}/>
      </div>
    </div>
  );
}
