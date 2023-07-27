
import React from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";

import { ChadsoftWriteCacheInput } from "./ChadsoftWriteCacheInput";
import { ChadsoftCacheExpiryInput } from "./ChadsoftCacheExpiryInput";

export function ChadsoftReadCacheAndSettingsInput() {
  const {register} = useFormContextAutoTT();
  const chadsoftReadCache = useWatchAutoTT({name: "chadsoft-read-cache"});

  return (
    <div>
      <label htmlFor="chadsoft-read-cache">Read cached Chadsoft files (chadsoft-read-cache): </label>
      <input type="checkbox" {...register("chadsoft-read-cache")}/>
      <ChadsoftWriteCacheInput/>
      {
        chadsoftReadCache ? <ChadsoftCacheExpiryInput/> : ""
      }
    </div>
  );
}