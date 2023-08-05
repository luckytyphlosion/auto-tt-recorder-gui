
import React from "react";
import { TriCheckbox } from "../TriCheckbox";

export function IgnoreAutoAddMissingFilesInput() {
  return (
    <div>
      <label htmlFor="ignore-auto-add-missing-files">Ignore auto-add missing files: </label>
      <TriCheckbox name="ignore-auto-add-missing-files"/>
    </div>
  );
}
