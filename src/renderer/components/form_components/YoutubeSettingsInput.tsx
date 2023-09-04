

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
        <p className="form-input-notes">Enables recommended encoding settings for YouTube.</p>
      </div>
    </div>
  );
}
