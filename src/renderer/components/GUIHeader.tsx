import React from "react";
import * as versions from "../../shared/versions";

export function GUIHeader() {
  return (
    <div className="auto-tt-rec-notes">
      <h1 className="title-header">Auto-TT-Recorder GUI ({versions.AUTO_TT_RECORDER_GUI_VERSION})</h1>
      <ul className="auto-tt-rec-notes-first-half">
        <li>All regions are supported, including NTSC-K.</li>
        <li>Supports almost all features from the non-GUI program</li>
        <li>I will fix the visual layout later.</li>
      </ul>
      <h3 className="troubleshooting-header">Troubleshooting below:</h3>
      <ul className="auto-tt-rec-troubleshooting">
        <li>Download VLC to fix audio problems with the video: <a href="https://www.videolan.org/">https://www.videolan.org</a></li>
        <li>Join the <a href=" https://discord.gg/6FqfpnqP57">Discord</a> for any questions:</li>
        <li>Source Code (for GUI): <a href="https://github.com/luckytyphlosion/auto-tt-recorder-gui">https://github.com/luckytyphlosion/auto-tt-recorder-gui</a></li>
      </ul>
    </div>
  );
}

