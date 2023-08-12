import React from "react";
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function TrackNameManualInput() {
  const {register} = useFormContextAutoTT();

  function inlineValidateTrackNameManual(event: React.ChangeEvent<HTMLInputElement>) {

  }

  return (
    <div className="grid-contents">
      <label className="start-label" htmlFor="track-name">Manual track name:</label>
      <div className="start-label-contents">
        <input type="text" id="track-name" {...register("track-name", {required: {
          value: true,
          message: "This input is required."
        }})}/>
        <SimpleErrorMessage name="track-name"/>
      </div>
    </div>
  );
}
