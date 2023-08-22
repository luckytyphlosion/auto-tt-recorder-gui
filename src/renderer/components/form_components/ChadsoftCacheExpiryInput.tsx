import React from "react";
import { ValidateResult } from "react-hook-form";
import { TextInput } from "../TextInput";

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
      console.log("ChadsoftCacheExpiryInput matchObj", matchObj);
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
    <TextInput name="chadsoft-cache-expiry" startLabel="How long until cached files should be purged (chadsoft-cache-expiry): " validate={validateChadsoftCacheExpiry}/>
  );
}
