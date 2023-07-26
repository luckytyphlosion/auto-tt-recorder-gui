
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function ChadsoftWriteCacheInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="chadsoft-write-cache">Cache downloaded Chadsoft files (chadsoft-write-cache): </label>
      <input type="checkbox" {...register("chadsoft-write-cache")}/>
    </div>
  );
}
