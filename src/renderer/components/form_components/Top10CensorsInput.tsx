import React, { useCallback } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import useRenderCounter from "../../RenderCounter";

//props: {register: UseFormRegister<AutoTTRecConfigFormFields>}
export function Top10CensorsInput() {
  const {register} = useFormContextAutoTT();

  const renderCounter = useRenderCounter(false, "Top10CensorsInput");

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="top-10-censors">IDs of players to censor (replace with Player), separated by spaces: </label>
      <div className="start-label-contents">
        <input type="text" id="top-10-censors" {...register("top-10-censors")}/>
        <SimpleErrorMessage name="top-10-censors"/>
        {renderCounter}
      </div>
    </div>
  );
}
