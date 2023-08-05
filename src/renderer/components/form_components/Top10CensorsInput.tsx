import React, { useCallback } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import useRenderCounter from "../../RenderCounter";

//props: {register: UseFormRegister<AutoTTRecConfigFormFields>}
export function Top10CensorsInput() {
  const {register} = useFormContextAutoTT();

  const renderCounter = useRenderCounter(false, "Top10CensorsInput");

  return (
    <div>
      <label htmlFor="top-10-censors">IDs of players to censor (replace with Player), separated by spaces: </label>
      <input type="text" {...register("top-10-censors")}/>
      <SimpleErrorMessage name="top-10-censors"/>
      {renderCounter}
    </div>
  );
}
