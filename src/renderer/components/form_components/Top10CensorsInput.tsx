import React from "react";
import { TextInput } from "../generic_components/TextInput";
import { FormInputNotesInlineCode } from "../reusable_components/FormInputNotesAutoTTRecArgName";

export function Top10CensorsInput() {
  return (
    <>
      <TextInput name="top-10-censors" startLabel="Top 10 censored players: " notRequired={true}/>
      <div className="grid-contents">
        <div className="start-label"></div>
        <div className="start-label-contents">
          <p className="form-input-notes">
            List IDs of players to replace on the Top 10 with the default Player Mii, separated by spaces <FormInputNotesInlineCode>chadsoft-cache-expiry</FormInputNotesInlineCode>.<br/>
            Player IDs can be found on the Chadsoft player page (<a href="https://www.chadsoft.co.uk/time-trials/players/9B/4F9DBFBEA30469.html">example link</a>).
          </p>
        </div>
      </div>
    </>
  );
}
