import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import useRenderCounter from "../../RenderCounter";

//props: {register: UseFormRegister<AutoTTRecConfigFormFields>}
export function EndingMessageInput() {
  const {register} = useFormContextAutoTT();

  const renderCounter = useRenderCounter(false, "EndingMessageInput");

  return (
    <div>
      <label htmlFor="ending-message">Ending message: </label>
      <input type="text" {...register("ending-message", {required: {
          value: true,
          message: "This input is required."
        }})}
      ></input>
      <SimpleErrorMessage name="ending-message"/>
      {renderCounter}
    </div>
  );
}
