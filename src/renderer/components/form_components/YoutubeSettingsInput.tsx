

import React from "react";
import { TriCheckbox } from "../generic_components/TriCheckbox";

export function YoutubeSettingsInput(props: {addCRFReminderToLabel: boolean}) {
  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="youtube-settings">Enable "youtube-settings": </label>
      <div className="start-label-contents">
        <TriCheckbox name="youtube-settings" nameAsId={true}/>
      </div>
      <label className="start-label form-input-notes--start-label">{props.addCRFReminderToLabel ? "(For CRF) " : ""}</label>
      <div className="start-label-contents">
        <p className="form-input-notes">Enables <a href="https://support.google.com/youtube/answer/1722171?hl=en#zippy=%2Cvideo-codec-h">recommended encoding settings for YouTube</a>.</p>
      </div>
    </div>
  );
}
