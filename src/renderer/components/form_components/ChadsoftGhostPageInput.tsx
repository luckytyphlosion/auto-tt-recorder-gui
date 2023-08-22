import React, { useState, useEffect } from "react";
import { useFormContextAutoTT, useTriggerAndRerenderAutoTT } from "../../use-form-context-auto-tt";

import { chadsoftGhostPageLinkRegex } from "../../../shared/shared-types";
import { TextInput } from "../TextInput";

export function ChadsoftGhostPageInput() {
  return (
    <TextInput name="chadsoft-ghost-page" startLabel="Ghost page link: " pattern={
      {value: chadsoftGhostPageLinkRegex, message: "Must be a valid chadsoft ghost link."}
    }/>
  );
}
