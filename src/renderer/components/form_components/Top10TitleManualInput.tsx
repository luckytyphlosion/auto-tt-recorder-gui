import React from "react";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function Top10TitleManualInput() {
  const {register} = useFormContextAutoTT();

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="top-10-title">Manual Top 10 Title:</label>
      <div className="start-label-contents">
        <input type="text" id="top-10-title" {...register("top-10-title", {required: {
          value: true,
          message: "This input is required."
        }})}/>
        <SimpleErrorMessage name="top-10-title"/>
      </div>
    </div>
  );
}
