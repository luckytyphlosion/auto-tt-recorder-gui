import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import useRenderCounter from "../../RenderCounter";

//props: {register: UseFormRegister<AutoTTRecConfigFormFields>}
export function EndingMessageInput() {
  const {register} = useFormContextAutoTT();

  const renderCounter = useRenderCounter(false, "EndingMessageInput");

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="ending-message">Ending message:</label>
      <div className="start-label-contents">
        <input type="text" id="ending-message" {...register("ending-message", {required: {
            value: true,
            message: "This input is required."
          }})}
        ></input>
        <SimpleErrorMessage name="ending-message"/>
        {renderCounter}
      </div>
    </div>
  );
}
