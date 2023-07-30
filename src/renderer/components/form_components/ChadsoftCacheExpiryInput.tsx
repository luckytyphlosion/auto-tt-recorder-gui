import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { ValidateResult } from "react-hook-form";

import useRenderCounter from "../../RenderCounter";

const durationRegex = /^(?:([0-9]+)h)?(?:([0-9]+)m)?(?:([0-9]+)s?)?(?<=.)$/;

function isNotNaNAndInfinite(num: number) {
  if (Number.isNaN(num)) {
    return false;
  } else {
    return !Number.isFinite(num);
  }
}

export function ChadsoftCacheExpiryInput() {
  const {register} = useFormContextAutoTT();

  const renderCounter = useRenderCounter(false, "ChadsoftCacheExpiryInput");

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
    <div>
        <label htmlFor="chadsoft-cache-expiry">How long until cached files should be purged (chadsoft-cache-expiry): </label>
        <input type="text"
          {...register("chadsoft-cache-expiry", {
            required: {
              value: true,
              message: "This input is required."
            },
            validate: validateChadsoftCacheExpiry
          })}
        ></input>
        <SimpleErrorMessage name="chadsoft-cache-expiry"/>
        {renderCounter}
    </div>
  );
}
