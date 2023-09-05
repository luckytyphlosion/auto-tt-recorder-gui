import React from "react";
import { ValidateResult } from "react-hook-form";
import { TextInput } from "../generic_components/TextInput";
import { FormInputNotesAutoTTRecArgName } from "../reusable_components/FormInputNotesAutoTTRecArgName";

const durationRegex = /^(?:([0-9]+)h)?(?:([0-9]+)m)?(?:([0-9]+)s?)?(?<=.)$/;

function isNotNaNAndInfinite(num: number) {
  if (Number.isNaN(num)) {
    return false;
  } else {
    return !Number.isFinite(num);
  }
}

export function ChadsoftCacheExpiryInput() {
  async function validateChadsoftCacheExpiry(chadsoftCacheExpiry: string): Promise<ValidateResult> {
    const matchObj = chadsoftCacheExpiry.trim().match(durationRegex);
    let errorMessage = "";

    if (matchObj !== null) {
      //console.log("ChadsoftCacheExpiryInput matchObj", matchObj);
      let hours = Number(matchObj[1]);
      let minutes = Number(matchObj[2]);
      let seconds = Number(matchObj[3]);

      if (Number.isNaN(hours) && Number.isNaN(minutes) && Number.isNaN(seconds)) {
        errorMessage = "Must specify one of hours, minutes, or seconds.";
      } else if (isNotNaNAndInfinite(hours) || isNotNaNAndInfinite(minutes) || isNotNaNAndInfinite(seconds)) {
        errorMessage = "One of hours, minutes, or seconds is too large.";
      }
    } else {
      errorMessage = "Not a valid duration. (e.g. 1h23m46s, 24h, 3h30m, 1000, 90m100s)"
    }

    if (errorMessage === "") {
      return true;
    } else {
      return errorMessage;
    }
  }

  return (
    <>
      <TextInput name="chadsoft-cache-expiry" startLabel="Purge cache files after: " validate={validateChadsoftCacheExpiry}/>
      <div className="grid-contents">
        <div className="start-label"></div>
        <div className="start-label-contents">
          <p className="form-input-notes">E.g. if the duration is 24h, removes a downloaded Chadsoft file 24 hours after downloaded <FormInputNotesAutoTTRecArgName>chadsoft-cache-expiry</FormInputNotesAutoTTRecArgName>.</p>
        </div>
      </div>
    </>
    
  );
}
