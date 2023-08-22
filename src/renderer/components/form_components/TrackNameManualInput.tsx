import React from "react";
import { TextInput } from "../TextInput";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function TrackNameManualInput() {
  return (
    <TextInput name="track-name" startLabel="Manual track name:"/>
  );
}
