import React from "react";

function GUIHeader() {
  return (
    <div className="auto-tt-rec-notes">
      <h1 className="title-header">Auto-TT-Recorder GUI (v0.2.7)</h1>
      <ul className="auto-tt-rec-notes-first-half">
        <li>All regions are supported, including NTSC-K.</li>
        <li>No complex features, just the bare minimum to produce a recording.</li>
        <li>Links below aren't hyperlinks yet because of time issues, this will be fixed in the next version</li>
      </ul>
      <h3 className="troubleshooting-header">Troubleshooting below:</h3>
      <ul className="auto-tt-rec-troubleshooting">
        <li>Download VLC to fix audio problems with the video: https://www.videolan.org/</li>
        <li>If Dolphin gives error code -1073741515, install Visual C++ Redistributable Packages for Visual Studio 2013: https://www.microsoft.com/en-us/download/details.aspx?id=40784</li>
        <li>ISO loading times shouldn't matter anymore, but if Dolphin gets stuck in a menu, contact me below</li>
        <li>Join the Discord for any questions: https://discord.gg/6FqfpnqP57</li>
        <li>Source Code (for GUI): https://github.com/luckytyphlosion/auto-tt-recorder-gui</li>
      </ul>
    </div>
  );
}

export default GUIHeader;
